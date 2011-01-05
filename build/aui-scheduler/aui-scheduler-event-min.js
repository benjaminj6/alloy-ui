AUI.add("aui-scheduler-event",function(Ae){var AM=Ae.Lang,BI=AM.isString,I=AM.isDate,A4=AM.isFunction,p=AM.isObject,A7=AM.isBoolean,AA=AM.isNumber,Av=Ae.ColorUtil,O=Ae.DataType.DateMath,A1=Ae.cached(function(A){return A.substring(0,1).toUpperCase()+A.substring(1);}),BE="-",a="&ndash;",AU=".",V="",W=" ",S="_",Ai="_propagateSet",u="activeView",Ac="borderStyle",BQ="borderWidth",q="Change",A0="color",Ar="colorBrightnessFactor",BA="colorSaturationFactor",Aa="content",AG="contentNode",b="disabled",Ay="duration",Al="endDate",BJ="events",AQ="hidden",AP="icon",y="icons",Az="id",At="isoTime",BP="locale",T="node",L="overlay",Ag="parentEvent",BT="recorder",Aj="repeat",BH="repeated",A5="repeater",t="repeatedEvents",AF="scheduler",AS="scheduler-event",AT="scheduler-event-recorder",BL="startDate",A3="template",Aq="title",H="titleDateFormat",n="titleNode",AN="visible",G="%H:%M",A2="%I:%M",l=Ae.ClassNameManager.getClassName,P=l(AP),X=l(AS),Am=l(AS,Aa),g=l(AS,AQ),BG=l(AS,b),AO=l(AS,BT),AW=l(AS,BH),AL=l(AS,A5),i=l(AS,Aq),BO=l(AS,y);CSS_SCHEDULER_EVENT_ICON_DISABLED=l(AS,AP,b),CSS_SCHEDULER_EVENT_ICON_REPEATED=l(AS,AP,BH),CSS_SCHEDULER_EVENT_ICON_REPEATER=l(AS,AP,A5);var v=Ae.Component.create({NAME:AS,ATTRS:{borderStyle:{value:"solid",validator:BI},borderWidth:{value:"1px",validator:BI},colorBrightnessFactor:{value:0.75,validator:AA},colorSaturationFactor:{value:1.5,validator:AA},content:{value:"(no title)",validator:BI},color:{lazyAdd:false,setter:"_setColor",value:"#D96666",validator:BI},titleDateFormat:{getter:"_getTitleDateFormat",validator:BI},endDate:{valueFn:function(){var A=O.clone(this.get(BL));A.setHours(A.getHours()+1);return A;},validator:I},columnNode:{setter:Ae.one},disabled:{value:false,validator:A7},node:{valueFn:function(){return Ae.Node.create(this.EVENT_NODE_TEMPLATE).setData(AS,this);},setter:Ae.one},parentEvent:{},repeat:{setter:"_setRepeat"},scheduler:{lazyAdd:false,setter:"_setScheduler"},startDate:{valueFn:function(){return new Date();},validator:I},visible:{value:true,validator:A7}},EXTENDS:Ae.Base,PROPAGATE_ATTRS:[BL,Al,Aa,A0,Ar,BA,Ac,BQ,H,AN,b],prototype:{EVENT_NODE_TEMPLATE:'<div class="'+X+'">'+'<div class="'+i+'"></div>'+'<div class="'+Am+'"></div>'+'<div class="'+BO+'">'+'<span class="'+[P,CSS_SCHEDULER_EVENT_ICON_REPEATED].join(W)+'"></span>'+'<span class="'+[P,CSS_SCHEDULER_EVENT_ICON_REPEATER].join(W)+'"></span>'+'<span class="'+[P,CSS_SCHEDULER_EVENT_ICON_DISABLED].join(W)+'"></span>'+"</div>"+"</div>",eventStack:null,initializer:function(){var A=this;var BC=A.get(T);A.eventStack={};A.nodeStack={};Ae.Array.each(Ae.SchedulerEvent.PROPAGATE_ATTRS,function(BD){A.after(BD+q,A._propagateAttrChange);});A._bindUIAttrs();A.contentNode=BC.one(AU+Am);A.titleNode=BC.one(AU+i);A.syncNodeUI(true);},destroy:function(){var A=this;A.eachRepeatedEvent(function(BC,BD){BC.destroy();});A.eventStack={};A.get(T).remove(true);},copyDates:function(BC){var A=this;A.set(Al,O.clone(BC.get(Al)));A.set(BL,O.clone(BC.get(BL)));},copyPropagateAttrValues:function(BC,BD){var A=this;A.copyDates(BC);Ae.Array.each(Ae.SchedulerEvent.PROPAGATE_ATTRS,function(BV){if(!(BV in (BD||{}))){var BW=BC.get(BV);if(!p(BW)){A.set(BV,BW);}}});},getBorderColor:function(){var A=this;return A.borderColorRGB.hex;},getDaysDuration:function(){var A=this;return O.getDayOffset(A.get(Al),A.get(BL));},getHoursDuration:function(){var A=this;return O.getHoursOffset(A.get(Al),A.get(BL));},getMinutesDuration:function(){var A=this;return O.getMinutesOffset(A.get(Al),A.get(BL));},getSecondsDuration:function(){var A=this;return O.getSecondsOffset(A.get(Al),A.get(BL));},sameEndDate:function(BC){var A=this;return O.compare(A.get(Al),BC.get(Al));},sameStartDate:function(BC){var A=this;return O.compare(A.get(BL),BC.get(BL));},isAfter:function(BV){var BD=this;var BC=BD.get(BL);var A=BV.get(BL);return O.after(BC,A);},isBefore:function(BV){var BD=this;var BC=BD.get(BL);var A=BV.get(BL);return O.before(BC,A);},repeatByDate:function(BD){var A=this;var BV=A.uidByDate(BD);if(!A.eventStack[BV]){var BC=O.clone(BD);var BW=O.clone(BD);O.copyHours(BC,A.get(BL));O.copyHours(BW,A.get(Al));var BX=new Ae.SchedulerEvent({endDate:BW,parentEvent:A,scheduler:A.get(AF),startDate:BC});BX.copyPropagateAttrValues(A);A.eventStack[BV]=BX;}return A.eventStack[BV];},intersects:function(BV){var BD=this;var BW=BD.get(Al);var BC=BD.get(BL);var A=BV.get(BL);return(BD.sameStartDate(BV)||O.between(A,BC,BW));},intersectHours:function(BD){var BC=this;var BW=BC.get(Al);var A=BC.get(BL);var BV=O.clone(A);O.copyHours(BV,BD.get(BL));return(O.compare(A,BV)||O.between(BV,A,BW));},isDayOverlapEvent:function(){var A=this;return O.isDayOverlap(A.get(BL),A.get(Al));},isRepeatableDate:function(BC){var A=this;var BD=A.get(Aj);return(BD&&BD.validate(A,BC));},getClearEndDate:function(){var A=this;return O.safeClearTime(A.get(Al));},getClearStartDate:function(){var A=this;return O.safeClearTime(A.get(BL));},uidByDate:function(BC){var A=this;BC=I(BC)?O.safeClearTime(BC):A.getClearStartDate();return[AS,BC.getTime()].join(S);},setContent:function(BD,BC){var A=this;A._setContent(AG,BD,BC);},setTitle:function(BD,BC){var A=this;A._setContent(n,BD,BC);},syncNodeUI:function(BC){var A=this;A._syncUIAttrs();A.syncNodeColorUI(BC);A.syncNodeTitleUI(BC);A.syncNodeContentUI(BC);},syncNodeColorUI:function(BC){var A=this;var BD=A.get(T);var BV=A.getBorderColor();if(BD){BD.setStyles({borderWidth:A.get(BQ),borderColor:BV,backgroundColor:A.get(A0),borderStyle:A.get(Ac)});}if(A.titleNode){A.titleNode.setStyles({backgroundColor:BV});}if(BC){A.eachRepeatedEvent(function(BW,BX){BW.syncNodeColorUI();});}},syncNodeContentUI:function(BC){var A=this;A.setContent(A.get(Aa),BC);},syncNodeTitleUI:function(BC){var A=this;var BD=A._formatDate(A.get(BL));var BV=A._formatDate(A.get(Al));A.setTitle([BD,BV].join(W+a+W),BC);},eachRepeatedEvent:function(BC){var A=this;Ae.each(A.eventStack,BC,A);},unlink:function(){var A=this;if(A.get(Ag)){A.set(Ag,null);}else{A.eachRepeatedEvent(function(BC,BD){BC.unlink();});}A.eventStack={};A.syncNodeUI();
},_afterDisabledChange:function(BC){var A=this;A._uiSetDisabled(BC.newVal);},_afterVisibleChange:function(BC){var A=this;A._uiSetVisible(BC.newVal);},_afterRepeatChange:function(BC){var A=this;A._uiSetRepeat(BC.newVal);},_afterParentEventChange:function(BC){var A=this;A._uiSetParentEvent(BC.newVal);},_bindUIAttrs:function(){var A=this;A.after("disabledChange",A._afterDisabledChange);A.after("visibleChange",A._afterVisibleChange);A.after("parentEventChange",A._afterParentEventChange);A.after("repeatChange",A._afterRepeatChange);A._syncUIAttrs();},_propagateAttrChange:function(BV){var A=this;var BD=BV.attrName;var BC=BV.newVal;A.eachRepeatedEvent(function(BW,BX){var BY=BW[Ai+A1(BD)];if(BY){BY.apply(A,[BW,BD,BC]);}else{BW.set(BD,BV.newVal);}BW.syncNodeUI();});A.syncNodeUI();},_propagateSetEndDate:function(A,BC,BV){var BD=O.clone(A.get(Al));O.copyHours(BD,BV);A.set(Al,BD);},_propagateSetStartDate:function(BC,BD,BV){var A=O.clone(BC.get(BL));O.copyHours(A,BV);BC.set(BL,A);},_setColor:function(BC){var A=this;A.hsbColor=Av.rgb2hsb(Av.getRGB(BC));A.borderColor=Ae.clone(A.hsbColor);A.borderColor.b*=A.get(Ar);A.borderColor.s*=A.get(BA);A.borderColorRGB=Av.hsb2rgb(A.borderColor);return BC;},_setContent:function(BD,BW,BC){var A=this;var BV=A[BD];if(BV){BV.setContent(BW);}if(BC){A.eachRepeatedEvent(function(BX,BY){BX[BD].setContent(BW);});}},_setRepeat:function(BC){var A=this;if(BI(BC)){BC=Ae.SchedulerEventRepeat[BC];}return p(BC)?BC:null;},_setScheduler:function(BD){var A=this;var BC=A.get(AF);if(BC){A.removeTarget(BC);}A.addTarget(BD);return BD;},_syncUIAttrs:function(){var A=this;A._uiSetDisabled(A.get(b));A._uiSetVisible(A.get(AN));A._uiSetParentEvent(A.get(Ag));A._uiSetRepeat(A.get(Aj));},_formatDate:function(BD,BV){var BC=this;var A=BC.get(BP);BV=BV||BC.get(H);return Ae.DataType.Date.format(BD,{format:BV,locale:A});},_getTitleDateFormat:function(BD){var A=this;if(!BI(BD)){var BC=A.get(AF);BD=(BC&&BC.get(u).get(At))?G:A2;}return BD;},_uiSetDisabled:function(BC){var A=this;A.get(T).toggleClass(BG,!!BC);},_uiSetParentEvent:function(BC){var A=this;A.get(T).toggleClass(AW,!!BC);},_uiSetRepeat:function(BC){var A=this;A.get(T).toggleClass(AL,!!BC);},_uiSetVisible:function(BC){var A=this;A.get(T).toggleClass(g,!BC);}}});Ae.SchedulerEvent=v;Ae.SchedulerEventRepeat={daily:{description:"Every day",validate:function(A,BC){return true;},value:"daily"},monthly:{description:"Every month",validate:function(BC,BD){var BV=BC.get(Al);var A=BC.get(BL);return(A.getDate()===BD.getDate());},value:"monthly"},monWedFri:{description:"Every Monday, Wednesday and Friday",validate:function(A,BC){return O.isMonWedOrFri(BC);},value:"monWedFri"},tuesThurs:{description:"Every Tuesday and Thursday",validate:function(A,BC){return O.isTueOrThu(BC);},value:"tuesThurs"},weekDays:{description:"Every week days",validate:function(A,BC){return O.isWeekDay(BC);},value:"weekDays"},weekly:{description:"Every week",validate:function(BC,BD){var BV=BC.get(Al);var A=BC.get(BL);return(A.getDay()===BD.getDay());},value:"weekly"},yearly:{description:"Every year",validate:function(BC,BD){var BV=BC.get(Al);var A=BC.get(BL);return((A.getMonth()===BD.getMonth())&&(A.getDay()===BD.getDay()));},value:"yearly"}};var u="activeView",BN="bc",BM="bd",AV="bodyContent",U="boundingBox",Af="button",F="column",Aa="content",Ab="dateFormat",AY="dblclick",Ax="desc",AX="disk",BS="event",A6="field",Ah="fieldset",AZ="form",AH="hint",AK="input",At="isoTime",Ak="label",Y="layout",Ap="menu",j="overlayContextPanel",Q="pencil",Aj="repeat",R="row",AF="scheduler",z="select",s="strings",B="tc",m="text",x="when",K="trigger",AI="auiSchedulerEventRecorderWhen",BB="auiSchedulerEventRecorderDesc",Aw="auiSchedulerEventRecorderSelect",h="auiSchedulerEventRecorderButtonRow",AE="cancel",e="edit",Ad="save",BE="-",k="#",BU=l(AS,BT,L),A9=l(AS,BT,AZ),Z=l(AZ),M=l(Y,Aa),BF=l(Y,Ah),AR=l(Y,Ah,BM),AD=l(Y,Ah,Aa),f=l(Y,"w100"),N=l(F),An=l(F,Aa),C=l(A6),c=l(A6,Ap),Ao=l(A6,z),BK=l(A6,Aa),E=l(A6,Ak),Au=l(A6,m),J=l(Af,R),A8=l(A6,AK),AJ=l(A6,AK,z),d=l(A6,AK,m),As=l(AS,BT,Ak,x),D=l(AS,BT,Ax),r=l(AS,BT,A6,AH),AC=l(AS,BT,Aj),AB=l(AS,BT,Af,R),o="<option></option>",BR='<form id="auiSchedulerEventRecorderForm" class="'+[A9,M,Z].join(W)+'">'+'<div class="'+[BF,f,N].join(W)+'">'+'<div class="'+[AD,An].join(W)+'aui-fieldset-content aui-column-content">'+'<div class="'+AR+'">'+'<span class="'+[C,Au].join(W)+'">'+'<span class="'+BK+'">'+'<label class="'+E+'">{when}:</label>'+'<span id="auiSchedulerEventRecorderWhen" class="'+As+'"></span>'+"</span>"+"</span>"+'<span class="'+[C,Au].join(W)+'">'+'<span class="'+BK+'">'+'<label class="'+E+'" for="auiSchedulerEventRecorderDesc">{description}</label>'+'<input id="auiSchedulerEventRecorderDesc" class="'+[A8,d,D].join(W)+'" size="30" type="text" />'+'<div class="'+r+'">'+"<span>{description-hint}</span>"+"</div>"+"</span>"+"</span>"+'<span class="'+[C,c,Ao].join(W)+'">'+'<label class="'+E+'" for="auiSchedulerEventRecorderSelect">{repeat}:</label>'+'<select id="auiSchedulerEventRecorderSelect" class="'+[A8,AJ,AC].join(W)+'">'+'<option selected="selected" value="">{no-repeat}</option>'+"</select>"+"</span>"+'<div id="auiSchedulerEventRecorderButtonRow" class="'+[C,J,AB].join(W)+'"></div>'+"</div>"+"</div>"+"</div>"+"</form>";var w=Ae.Component.create({NAME:AT,ATTRS:{content:{value:V},duration:{value:60},dateFormat:{value:"%a, %B %d,",validator:BI},event:{},strings:{value:{},setter:function(A){return Ae.merge({save:"Save",cancel:"Cancel",description:"Description",edit:"Edit",repeat:"Repeat",when:"When","description-hint":"e.g., Dinner at Brian's","no-repeat":"No repeat"},A||{});},validator:p},overlayContextPanel:{value:{},setter:function(BC){var A=this;var BD=Ae.Node.create(Ae.substitute(BR,A.get(s)));return Ae.merge({align:{points:[BN,B]},anim:false,bodyContent:BD,hideOn:AY,trigger:A.get(T),visible:false,zIndex:9999},BC||{});}}},EXTENDS:Ae.SchedulerEvent,prototype:{initializer:function(){var A=this;A._createEvents();A.after("schedulerChange",A._afterSchedulerChange);A.on("startDateChange",A._onStartDateChange);
A.get(T).addClass(AO);},showOverlay:function(){var A=this;if(!A.overlay){A._initOverlay();}A.overlay.render().show();},getEventCopy:function(BC){var A=this;var BV=A.overlayDescNode.val();var BD=A.get(BS);if(!BD){BD=new Ae.SchedulerEvent({endDate:A.get(Al),scheduler:A.get(AF),startDate:A.get(BL)});BD.copyPropagateAttrValues(A,{content:true});}BD.set(Aj,A.overlaySelectNode.val());if(BV){BD.set(Aa,BV);}return BD;},hideOverlay:function(){var A=this;if(A.overlay){A.overlay.hide();}},loadFormValues:function(){var A=this;var BV=V;var BD=V;var BC=A.get(BS);if(BC){var BW=BC.get(Aj);if(BW){BV=BW.value;}BD=BC.get(Aa);}A.overlaySelectNode.val(BV);A.overlayWhenNode.setContent(A._getWhenFormattedDt());setTimeout(function(){A.overlayDescNode.val(BD).selectText();},0);},_afterSchedulerChange:function(BV){var A=this;var BD=BV.newVal;var BC=BD.get(U);BC.delegate("click",Ae.bind(A._onClickSchedulerEvent,A),AU+X);},_createEvents:function(){var A=this;var BC=function(BD,BV){A.publish(BD,{defaultFn:BV,queuable:false,emitFacade:true,bubbles:true});};BC(Ad,this._defSaveEventFn);BC(e,this._defEditEventFn);BC(AE,this._defCancelEventFn);},_initOverlay:function(){var BC=this;var A=BC.get(s);BC.overlay=new Ae.OverlayContextPanel(BC.get(j));var BV=BC.overlay;var BD=BV.get(U);var BW=BV.get(AV);BC.overlayButtonRowNode=BW.one(k+h);BC.overlayDescNode=BW.one(k+BB);BC.overlaySelectNode=BW.one(k+Aw);BC.overlayWhenNode=BW.one(k+AI);BC.overlaySaveBtn=new Ae.ButtonItem({label:A.save,icon:AX,render:BC.overlayButtonRowNode,handler:{fn:BC._handleSaveEvent,context:BC}});BC.overlayEditBtn=new Ae.ButtonItem({label:A.edit,icon:Q,render:BC.overlayButtonRowNode,handler:{fn:BC._handleEditEvent,context:BC}});BC.overlayCancelBtn=new Ae.ButtonItem({label:A.cancel,render:BC.overlayButtonRowNode,handler:{fn:BC._handleCancelEvent,context:BC}});Ae.each(Ae.SchedulerEventRepeat,function(BY,BX){BC.overlaySelectNode.append(Ae.Node.create(o).val(BY.value||BX).setContent(BY.description));});BV.on("hide",Ae.bind(BC._onOverlayHide,BC));BV.on("show",Ae.bind(BC._onOverlayShow,BC));BW.on("submit",Ae.bind(BC._onSubmitForm,BC));BD.addClass(BU);},_defCancelEventFn:function(BC){var A=this;A.hideOverlay();},_defEditEventFn:function(BD){var A=this;var BC=A.get(AF);A.hideOverlay();BC.syncEventsUI();},_defSaveEventFn:function(BD){var A=this;var BC=A.get(AF);BC.addEvent(BD.newSchedulerEvent);A.hideOverlay();BC.syncEventsUI();},_getWhenFormattedDt:function(){var BD=this;var BC=BD.get(Ab);var BW=(BD.get(BS)||BD);var BY=BW.get(Al);var BX=BW.get(AF);var A=BW.get(BL);var BV=(BX.get(u).get(At)?O.toIsoTimeString:O.toUsTimeString);return[BW._formatDate(A,BC),BV(A),BE,BV(BY)].join(W);},_handleEditEvent:function(BC){var A=this;A.fire(e,{newSchedulerEvent:A.getEventCopy()});BC.preventDefault();},_handleSaveEvent:function(BC){var A=this;A.fire(Ad,{newSchedulerEvent:A.getEventCopy()});BC.preventDefault();},_handleCancelEvent:function(BC){var A=this;A.fire(AE);BC.preventDefault();},_onClickSchedulerEvent:function(BD){var A=this;var BC=BD.currentTarget.getData(AS);if(BC){if(!A.overlay){A._initOverlay();}A.set(BS,BC);A.overlay.set(K,BC.get(T));A.get(T).remove();A.showOverlay();}},_onOverlayHide:function(BD){var A=this;var BC=A.get(T);if(A.overlay){A.set(BS,null);A.overlay.set(K,BC);}BC.remove();},_onOverlayShow:function(BD){var BC=this;var BV=BC.overlayEditBtn;var A=BC.overlaySaveBtn;if(BC.get(BS)){BV.show();A.hide();}else{BV.hide();A.show();}BC.loadFormValues();},_onStartDateChange:function(BC){var A=this;var BD=A.get(Ay);A.set(Al,O.add(BC.newVal,O.MINUTES,BD));},_onSubmitForm:function(BC){var A=this;if(A.get(BS)){A._handleEditEvent(BC);}else{A._handleSaveEvent(BC);}}}});Ae.SchedulerEventRecorder=w;},"@VERSION@",{skinnable:true,requires:["aui-base","aui-color-util","aui-datatype","aui-overlay-context-panel","substitute"]});