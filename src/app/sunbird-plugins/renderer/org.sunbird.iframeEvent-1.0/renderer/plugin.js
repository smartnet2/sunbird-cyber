/**
 * Plugin to read the telemetry event from the renderer
 * @extends { Renderer BasePlugin}
 * @author Manjunath Davanam
 */

 
Plugin.extend({   
    initialize: function(){
        console.info('Sunbird Telemetry get plugin is initialized..');
        EventBus.addEventListener('telemetryEvent',this.sendTelemetry,this);       
    },
    isPreviewInIframe: function(){
        return (window.self != window.top) ? true : false;
    },
    sendTelemetry: function(evt) {
        var instance = this; 
        if (instance.isPreviewInIframe()) {
            if (evt.target) {
                var parsedData = JSON.parse(evt.target);
                    var custTelemetryEvent = new CustomEvent('renderer:telemetry:event', {
                        "detail": {
                            "telemetryData": parsedData
                        }
                    });
                    window.parent.document.getElementById('contentPlayer').dispatchEvent(custTelemetryEvent);
                  //  console.info('OE_END Event is sending..');
                  if(parsedData.eid === 'END') {
                    this.getTotalScore();
                  }
            }
            
        }
    },
   getTotalScore : function() {
        var totalScore = 0, maxScore = 0;
        var teleEvents = org.ekstep.service.content.getTelemetryEvents();
        if (!_.isEmpty(teleEvents) && !_.isUndefined(teleEvents.assess)) {
            console.log('teleEvents.assess========>', teleEvents.assess)
            _.forEach(teleEvents.assess, function(value) {
                if(value.edata.score) {
                    totalScore = totalScore + value.edata.score;
                    console.log('totalScore=======>',totalScore)
                }
                if(value.edata.item.maxscore) {
                    maxScore = maxScore + value.edata.item.maxscore;
                    console.log('maxScore=======>',maxScore)
                } else {
                    maxScore = maxScore + 0;
                }
            });
            window.org.ekstep.totalScore = totalScore;
            window.org.ekstep.maxScore = maxScore; // Store
            localStorage.setItem("totalScore", totalScore);
            localStorage.setItem("maxScore", maxScore);
        }  else {
            localStorage.removeItem("totalScore");
            localStorage.removeItem("maxScore");
        }
    }
});


//# sourceURL=rendererEventReaderer.js