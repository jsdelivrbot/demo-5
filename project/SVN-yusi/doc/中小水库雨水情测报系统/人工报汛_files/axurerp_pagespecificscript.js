
var PageName = '人工报汛';
var PageId = 'p8f44f6d248d34c31ad5733d8e391cea0'
var PageUrl = '人工报汛.html'
document.title = '人工报汛';

if (top.location != self.location)
{
	if (parent.HandleMainFrameChanged) {
		parent.HandleMainFrameChanged();
	}
}

var $OnLoadVariable = '';

var $CSUM;

var hasQuery = false;
var query = window.location.hash.substring(1);
if (query.length > 0) hasQuery = true;
var vars = query.split("&");
for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0].length > 0) eval("$" + pair[0] + " = decodeURIComponent(pair[1]);");
} 

if (hasQuery && $CSUM != 1) {
alert('Prototype Warning: The variable values were too long to pass to this page.\nIf you are using IE, using Firefox will support more data.');
}

function GetQuerystring() {
    return '#OnLoadVariable=' + encodeURIComponent($OnLoadVariable) + '&CSUM=1';
}

function PopulateVariables(value) {
  value = value.replace(/\[\[OnLoadVariable\]\]/g, $OnLoadVariable);
  value = value.replace(/\[\[PageName\]\]/g, PageName);
  return value;
}

function OnLoad(e) {

}

var u86 = document.getElementById('u86');
gv_vAlignTable['u86'] = 'top';
var u54 = document.getElementById('u54');
gv_vAlignTable['u54'] = 'top';
var u60 = document.getElementById('u60');

var u29 = document.getElementById('u29');
gv_vAlignTable['u29'] = 'center';
var u45 = document.getElementById('u45');
gv_vAlignTable['u45'] = 'top';
var u83 = document.getElementById('u83');

var u51 = document.getElementById('u51');
gv_vAlignTable['u51'] = 'top';
var u96 = document.getElementById('u96');
gv_vAlignTable['u96'] = 'center';
var u79 = document.getElementById('u79');
gv_vAlignTable['u79'] = 'top';
var u42 = document.getElementById('u42');
gv_vAlignTable['u42'] = 'top';
var u80 = document.getElementById('u80');

var u26 = document.getElementById('u26');
gv_vAlignTable['u26'] = 'center';
var u5 = document.getElementById('u5');
gv_vAlignTable['u5'] = 'top';
var u23 = document.getElementById('u23');
gv_vAlignTable['u23'] = 'center';
var u76 = document.getElementById('u76');
gv_vAlignTable['u76'] = 'top';
var u14 = document.getElementById('u14');
gv_vAlignTable['u14'] = 'center';
var u67 = document.getElementById('u67');
gv_vAlignTable['u67'] = 'top';
var u20 = document.getElementById('u20');
gv_vAlignTable['u20'] = 'center';
var u73 = document.getElementById('u73');
gv_vAlignTable['u73'] = 'top';
var u48 = document.getElementById('u48');
gv_vAlignTable['u48'] = 'top';
var u4 = document.getElementById('u4');
gv_vAlignTable['u4'] = 'center';
var u11 = document.getElementById('u11');
gv_vAlignTable['u11'] = 'center';
var u64 = document.getElementById('u64');
gv_vAlignTable['u64'] = 'center';
var u70 = document.getElementById('u70');

var u39 = document.getElementById('u39');
gv_vAlignTable['u39'] = 'top';
var u87 = document.getElementById('u87');

var u55 = document.getElementById('u55');

var u93 = document.getElementById('u93');
gv_vAlignTable['u93'] = 'center';
var u61 = document.getElementById('u61');
gv_vAlignTable['u61'] = 'center';
var u84 = document.getElementById('u84');
gv_vAlignTable['u84'] = 'top';
var u52 = document.getElementById('u52');

var u90 = document.getElementById('u90');
gv_vAlignTable['u90'] = 'center';
var u36 = document.getElementById('u36');
gv_vAlignTable['u36'] = 'top';
var u89 = document.getElementById('u89');

var u81 = document.getElementById('u81');

var u27 = document.getElementById('u27');
gv_vAlignTable['u27'] = 'top';
var u33 = document.getElementById('u33');
gv_vAlignTable['u33'] = 'top';
var u0 = document.getElementById('u0');

var u24 = document.getElementById('u24');
gv_vAlignTable['u24'] = 'top';
var u77 = document.getElementById('u77');

var u30 = document.getElementById('u30');
gv_vAlignTable['u30'] = 'top';
var u58 = document.getElementById('u58');

var u15 = document.getElementById('u15');
gv_vAlignTable['u15'] = 'top';
var u21 = document.getElementById('u21');
gv_vAlignTable['u21'] = 'top';
var u74 = document.getElementById('u74');
gv_vAlignTable['u74'] = 'top';
var u49 = document.getElementById('u49');

var u12 = document.getElementById('u12');
gv_vAlignTable['u12'] = 'top';
var u65 = document.getElementById('u65');

var u71 = document.getElementById('u71');
gv_vAlignTable['u71'] = 'top';
var u94 = document.getElementById('u94');
gv_vAlignTable['u94'] = 'top';
var u62 = document.getElementById('u62');
gv_vAlignTable['u62'] = 'top';
var u46 = document.getElementById('u46');

var u85 = document.getElementById('u85');

var u91 = document.getElementById('u91');
gv_vAlignTable['u91'] = 'top';
var u37 = document.getElementById('u37');

var u43 = document.getElementById('u43');

var u17 = document.getElementById('u17');
gv_vAlignTable['u17'] = 'center';
var u18 = document.getElementById('u18');
gv_vAlignTable['u18'] = 'top';
var u82 = document.getElementById('u82');

var u1 = document.getElementById('u1');
gv_vAlignTable['u1'] = 'center';
var u34 = document.getElementById('u34');

var u40 = document.getElementById('u40');

var u68 = document.getElementById('u68');

var u25 = document.getElementById('u25');

var u31 = document.getElementById('u31');

var u97 = document.getElementById('u97');
gv_vAlignTable['u97'] = 'top';
var u59 = document.getElementById('u59');
gv_vAlignTable['u59'] = 'center';
var u22 = document.getElementById('u22');

var u75 = document.getElementById('u75');

var u88 = document.getElementById('u88');

var u8 = document.getElementById('u8');

var u72 = document.getElementById('u72');
gv_vAlignTable['u72'] = 'top';
var u56 = document.getElementById('u56');
gv_vAlignTable['u56'] = 'center';
var u95 = document.getElementById('u95');

var u47 = document.getElementById('u47');
gv_vAlignTable['u47'] = 'center';
var u53 = document.getElementById('u53');
gv_vAlignTable['u53'] = 'center';
var u28 = document.getElementById('u28');

var u92 = document.getElementById('u92');

var u2 = document.getElementById('u2');
gv_vAlignTable['u2'] = 'top';
var u44 = document.getElementById('u44');
gv_vAlignTable['u44'] = 'center';
var u50 = document.getElementById('u50');
gv_vAlignTable['u50'] = 'center';
var u19 = document.getElementById('u19');

var u78 = document.getElementById('u78');

var u7 = document.getElementById('u7');
gv_vAlignTable['u7'] = 'center';
var u41 = document.getElementById('u41');
gv_vAlignTable['u41'] = 'center';
var u69 = document.getElementById('u69');
gv_vAlignTable['u69'] = 'center';
var u32 = document.getElementById('u32');
gv_vAlignTable['u32'] = 'center';
var u16 = document.getElementById('u16');

var u9 = document.getElementById('u9');
gv_vAlignTable['u9'] = 'top';
var u13 = document.getElementById('u13');

var u66 = document.getElementById('u66');
gv_vAlignTable['u66'] = 'center';
var u6 = document.getElementById('u6');

var u35 = document.getElementById('u35');
gv_vAlignTable['u35'] = 'center';
var u57 = document.getElementById('u57');
gv_vAlignTable['u57'] = 'top';
var u10 = document.getElementById('u10');

var u63 = document.getElementById('u63');

var u38 = document.getElementById('u38');
gv_vAlignTable['u38'] = 'center';
var u3 = document.getElementById('u3');

if (window.OnLoad) OnLoad();
