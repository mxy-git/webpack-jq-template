(function () {
  if (window.WebViewJavascriptBridge) {
    return
  }
  var messagingIframe;
  var sendMessageQueue = [];
  var receiveMessageQueue = [];
  var messageHandlers = {};
  var CUSTOM_PROTOCOL_SCHEME = "wkd";
  var QUEUE_HAS_MESSAGE = "__QUEUE_MESSAGE__/";
  var responseCallbacks = {};
  var uniqueId = 1;

  function _createQueueReadyIframe(doc) {
    messagingIframe = doc.createElement("iframe");
    messagingIframe.style.display = "none";
    doc.documentElement.appendChild(messagingIframe)
  }

  function isAndroid() {
    var ua = navigator.userAgent.toLowerCase();
    var isA = ua.indexOf("android") > -1;
    if (isA) {
      return true
    }
    return false
  }

  function isIphone() {
    var ua = navigator.userAgent.toLowerCase();
    var isIph = ua.indexOf("iphone") > -1;
    if (isIph) {
      return true
    }
    return false
  }

  function init(messageHandler) {
    if (WebViewJavascriptBridge._messageHandler) {
      throw new Error("WebViewJavascriptBridge.init called twice")
    }
    WebViewJavascriptBridge._messageHandler = messageHandler;
    var receivedMessages = receiveMessageQueue;
    receiveMessageQueue = null;
    for (var i = 0; i < receivedMessages.length; i++) {
      _dispatchMessageFromNative(receivedMessages[i])
    }
  }

  function send(data, responseCallback) {
    _doSend({
      data: data
    }, responseCallback)
  }

  function registerHandler(handlerName, handler) {
    messageHandlers[handlerName] = handler
  }

  function callHandler(handlerName, data, responseCallback) {
    _doSend({
      handlerName: handlerName,
      data: data
    }, responseCallback)
  }

  function _doSend(message, responseCallback) {
    if (responseCallback) {
      var callbackId = "cb_" + (uniqueId++) + "_" + new Date().getTime();
      responseCallbacks[callbackId] = responseCallback;
      message.callbackId = callbackId
    }
    sendMessageQueue.push(message);
    messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + "://" + QUEUE_HAS_MESSAGE
  }

  function _fetchQueue() {
    var messageQueueString = JSON.stringify(sendMessageQueue);
    sendMessageQueue = [];
    if (isIphone()) {
      return messageQueueString
    } else {
      if (isAndroid()) {
        messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + "://return/_fetchQueue/" + encodeURIComponent(messageQueueString)
      }
    }
  }

  function _dispatchMessageFromNative(messageJSON) {
    setTimeout(function () {
      var message = JSON.parse(messageJSON);
      var responseCallback;
      if (message.responseId) {
        responseCallback = responseCallbacks[message.responseId];
        if (!responseCallback) {
          return
        }
        responseCallback(message.responseData);
        delete responseCallbacks[message.responseId]
      } else {
        if (message.callbackId) {
          var callbackResponseId = message.callbackId;
          responseCallback = function (responseData) {
            _doSend({
              responseId: callbackResponseId,
              responseData: responseData
            })
          }
        }
        var handler = WebViewJavascriptBridge._messageHandler;
        if (message.handlerName) {
          handler = messageHandlers[message.handlerName]
        }
        try {
          handler(message.data, responseCallback)
        } catch (exception) {
          if (typeof console != "undefined") {
            console.log("WebViewJavascriptBridge: WARNING: javascript handler threw.", message, exception)
          }
        }
      }
    })
  }

  function _handleMessageFromNative(messageJSON) {
    if (receiveMessageQueue) {
      receiveMessageQueue.push(messageJSON)
    } else {
      _dispatchMessageFromNative(messageJSON)
    }
  }
  var WebViewJavascriptBridge = window.WebViewJavascriptBridge = {
    init: init,
    send: send,
    registerHandler: registerHandler,
    callHandler: callHandler,
    _fetchQueue: _fetchQueue,
    _handleMessageFromNative: _handleMessageFromNative
  };
  var doc = document;
  _createQueueReadyIframe(doc);
  var readyEvent = doc.createEvent("Events");
  readyEvent.initEvent("WebViewJavascriptBridgeReady");
  readyEvent.bridge = WebViewJavascriptBridge;
  doc.dispatchEvent(readyEvent)
})();
