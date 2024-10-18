/**
 * BeFoward Script
 */

/* IE */
if(!Array.indexOf){
	Array.prototype.indexOf = function(target){
		for(var i = 0; i < this.length; i++){
			if(this[i] === target){
				return i;
			}
		}
		return -1;
	}
}

/* IE */
if(typeof String.prototype.trim !== 'function') {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	}
}

// cookie確認
function cookie_check(){
	var cookies = document.cookie.split('; ');
	var cookies_length = cookies.length;
	var authkey = '';
	for(var i = 0; i < cookies_length; i++){
		var str = cookies[i].split("=");
		if(str[0] == 'BeforwardCookie[bf_secure_info]'){
			var val = JSON.parse(decodeURIComponent(str[1]));
			authkey = val.authkey;
			break;
		}
	}
	return authkey;
}

// cookie確認
function cookie_supporters_check(){
	var cookies = document.cookie.split('; ');
	var cookies_length = cookies.length;
	var isSupporters = '';
	for(var i = 0; i < cookies_length; i++){
		var str = cookies[i].split("=");
		if(str[0] == 'BeforwardCookie[bf_secure_info]'){
			var val = JSON.parse(decodeURIComponent(str[1]));
			isSupporters = val.isSupporters;
			break;
		}
	}
	return isSupporters;
}

// cookie確認
function cookie_deposit_check(){
	var cookies = document.cookie.split('; ');
	var cookies_length = cookies.length;
	var is_not_show_deposit_link = '';
	for(var i = 0; i < cookies_length; i++){
		var str = cookies[i].split("=");
		if(str[0] == 'BeforwardCookie[bf_secure_info]'){
			var val = JSON.parse(decodeURIComponent(str[1]));
			is_not_show_deposit_link = val.is_not_show_deposit_link;
			break;
		}
	}
	return is_not_show_deposit_link;
}

function quickTopSearch(){
    document.getElementById('schFm').submit();
}

function runReset(){
	jQuery('#listFm')[0].reset();
	if( jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 8){
		var sel_elements = document.getElementById("listFm").getElementsByTagName('select');
		for(var k = 0; k < sel_elements.length; k++){
			if(sel_elements[k].className == 'activated'){
				sel_elements[k].setAttribute('className', '');
				sel_elements[k].selectedIndex = 0;
				for(var i = 0; i < sel_elements[k].getElementsByTagName('option').length; i++)	{
					sel_elements[k].getElementsByTagName('option')[i].setAttribute('selected', '');
				}
			}
		}
		var text_elements = document.getElementById("listFm").getElementsByTagName('input');
		for(var k = 0; k < text_elements.length; k++){
			if(text_elements[k].type == 'text'){
				text_elements[k].value = '';
			}else if(text_elements[k].type == 'checkbox'){
				if(text_elements[k].checked == true)	{
					text_elements[k].checked = false;
				}
			}
		}
	}else{
		jQuery(':text, :password, :file, SELECT', '#listFm').val('');
		jQuery(':input','#listFm').removeAttr('checked').removeAttr('checked').removeClass('activated');
	}

	if (document.getElementById('dummy_form') != null) {
		jQuery('#dummy_form')[0].reset();
		if( jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 8){
			var sel_elements = document.getElementById("dummy_form").getElementsByTagName('select');
			for(var k = 0; k < sel_elements.length; k++){
				if(sel_elements[k].className == 'activated'){
					sel_elements[k].setAttribute('className', '');
					sel_elements[k].selectedIndex = 0;
					for(var i = 0; i < sel_elements[k].getElementsByTagName('option').length; i++)	{
						sel_elements[k].getElementsByTagName('option')[i].setAttribute('selected', '');
					}
				}
			}
		}else{
			jQuery(':text, :password, :file, SELECT', '#dummy_form').val('');
			jQuery(':input','#dummy_form').removeAttr('checked').removeAttr('checked').removeClass('activated');
		}
	}
}

function runReset2(){

	jQuery('#listFm2')[0].reset();
	if( jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 8){
		var sel_elements = document.getElementById("listFm2").getElementsByTagName('select');
		for(var k = 0; k < sel_elements.length; k++){
			if(sel_elements[k].className == 'activated'){
				sel_elements[k].setAttribute('className', '');
				sel_elements[k].selectedIndex = 0;
				for(var i = 0; i < sel_elements[k].getElementsByTagName('option').length; i++)	{
					sel_elements[k].getElementsByTagName('option')[i].setAttribute('selected', '');
				}
			}
		}
		var text_elements = document.getElementById("listFm2").getElementsByTagName('input');
		for(var k = 0; k < text_elements.length; k++){
			if(text_elements[k].type == 'text'){
				text_elements[k].value = '';
			}else if(text_elements[k].type == 'checkbox'){
				if(text_elements[k].checked == true)	{
					text_elements[k].checked = false;
				}
			}
		}
	}else{
		jQuery(':text, :password, :file, SELECT', '#listFm2').val('');
		jQuery(':input','#listFm2').removeAttr('checked').removeAttr('checked').removeClass('activated');
	}

	$("#nearest_port_city_status").html('');
}

function changeImg(src){
	$("#mainImage").attr("src", src);
	$("#mainImage").parent().attr("href", src);
}

function loadModelByMaker(obj,url,target_input) {

	var sl_target_form = undefined;

	if (obj) {
		url += '/' + obj.value;
		sl_target_form = obj.form;
	}

	if (!sl_target_form) {
		return false;
	}

	// 成功時
	var success_handler = function(data, textStatus) {
		var select_part = $(target_input, sl_target_form);

		if (!data) {
			return;
		}

		if (data.model_list) {
			// リストクリア
			select_part.empty();
			select_part.val('');
			select_part.append($('<option>').attr({ value: '' }).text('Select'));

			for (var i in data.model_list) {
				var tmp = data.model_list[i];
				select_part.append($('<option>').attr({value: tmp.id}).text(tmp.name));
			}

			// This line is for I.E 7
			select_part.value = '';
		}
	};

	// 失敗時
	var error_handler = function(xhr, textStatus, errorThrown) {
	};

	send_ajax(url,null,success_handler,error_handler);
}

function loadSubTypeByType(obj,url,target_input) {
	var sl_target_form = undefined;

	if (obj) {
		url += '/' + obj.value;
		sl_target_form = obj.form;
	}

	if (!sl_target_form) {
		return false;
	}

	// 成功時
	var success_handler = function(data, textStatus) {
		var select_part = $(target_input, sl_target_form);

		if (!data) {
			return;
		}

		if (data.type_list) {
			// リストクリア
			select_part.empty();
			select_part.val('');

			if (data.type_list.length == 0) {
				select_part.append($('<option>').attr({ value: '' }).text('Nothing'));
			} else {
				select_part.append($('<option>').attr({ value: '' }).text('Select'));
			}
			for (var i in data.type_list) {
				var tmp = data.type_list[i];
				select_part.append($('<option>').attr({value: tmp.id}).text(tmp.name));
			}

			// This line is for I.E 7
			select_part.value = '';
		}
	};

	// 失敗時
	var error_handler = function(xhr, textStatus, errorThrown) {
	};

	send_ajax(url,null,success_handler,error_handler);
}

/**
 * Stock CountryからStock Locationをフィルタ
 */
function loadStockArea(obj,url,target_input) {
	var sl_target_form = undefined;

	if (obj) {
		url += '/' + obj.value;
		sl_target_form = obj.form;
	}

	if (!sl_target_form) {
		return false;
	}

	// 成功時
	var success_handler = function(data, textStatus) {
		var select_part = $(target_input, sl_target_form);

		if (!data) {
			return;
		}

		if (data.area_list) {
			// リストクリア
			select_part.empty();
			select_part.val('');

			if (data.area_list.length == 0) {
				select_part.append($('<option>').attr({ value: '' }).text("<?php __('Nothing') ?>"));
			} else {
				select_part.append($('<option>').attr({ value: '' }).text("<?php __('Select') ?>"));
			}

			for (var i in data.area_list) {
				var tmp = data.area_list[i];
				select_part.append($('<option>').attr({value: tmp.id}).text(tmp.name));
			}

			// This line is for I.E 7
			select_part.value = '';
		}
	};

	// 失敗時
	var error_handler = function(xhr, textStatus, errorThrown) {
	};

	send_ajax(url, null, success_handler, error_handler);
}

function close_popup() {
	$('#popup_window').jqmHide();
}

function close_jqm_popup(selector) {
    $(selector).jqmHide();
}

function switch_promotion_code(data) {
	$(".promotion-code-description").hide();

	var $final_country = $('.promotion-code-description[data-promotion-country-id="'+data.final_country_id+'"]');
	var country_code = $(':hidden[name="country-code"]').val();
	var $selected_country = $('.promotion-code-description[data-promotion-country-code="'+country_code+'"]');

	if ($final_country.length > 0) {
		$final_country.show();
	} else if ($selected_country.length > 0) {
		$selected_country.show();
	}
}

function switch_port_list(data, tp_target_form) {
	if (!tp_target_form) {
		return false;
	}

	// フォーム内のname="alt_port_id"
	var $select_part = $(tp_target_form.alt_port_id);

	// リストクリア
	$select_part.empty();
	$select_part.append($('<option>').attr({value:''}).text('Select'));

	// 港リスト
	if(data.port_list){
		for(var val in data.port_list){
			var tmp = data.port_list[val];
			if (tmp.name instanceof Object) {
				var $tmp_opt = $('<optgroup>');
				$tmp_opt.attr('label',tmp.id);
				for (var val2 in tmp.name) {
					var tmp2 = tmp.name[val2];
					$tmp_opt.append($('<option>').attr({value:tmp2.id}).text(tmp2.name));
				}
				$select_part.append($tmp_opt);
			} else {
				$select_part.append($('<option>').attr({value:tmp.id}).text(tmp.name));
			}
		}
		$select_part.val(''); // This line is for I.E 7
	}
}

function switch_certification(data, target_form) {
	// 検査フラグ、証明書フラグの設定
	var $select_part = $(target_form.alt_port_id);

	var inspection_value = 0;
	var inspection_text = "NO";
	var certificate_velue = 0;
	var certificate_text = "NO";

	if (data.certificate_type) {
		$('#insurance_str').text('YES');
		$('input[name=insurance]',target_form).val(1);

		// 検査フラグ
		var sp1 = data.certificate_type.sp1_flg;
		if (sp1 && sp1 != "0") {
			// INSURANCEが顧客選択可でかつ、初期値がNOの国
			// inspection_value = 1 or 0;
			inspection_value = data.certificate_type.ins_default;
			if(inspection_value=='1'){
				inspection_text = "YES";
			}else{
				inspection_text = "NO";
			}
		}

		// 証明書フラグ
		var cer = data.certificate_type.certificate_type;
		if (cer && cer != "0") {
			certificate_velue = 1;
			certificate_text = "YES";
		}
	}

	$('input[name=inspection]',target_form).val(inspection_value);
	$('#inspection_str').text(inspection_text);
	$('input[name=certificate]',target_form).val(certificate_velue);
	$('#certificate_str').text(certificate_text);
}

function change_final_country(obj, url) {
	if (obj) {
		url += '/' + obj.value;
		target_form = obj.form;
	}

	var success_func = function(data,textStatus){
		switch_promotion_code(data);
		switch_port_list(data, target_form);
		switch_certification(data, target_form);
	};

	send_ajax(url,null,success_func,null);
}

function inq_select_inquiry(obj,url,list) {

	if (obj) {
		url += '/' + obj.value;
		target_form = obj.form;
	}

	var success_func = function(data,textStatus){

		// Promotion Code の説明文を Final Countryの選択によって切り替え
		var $final_country = $('.promotion-code-description[data-promotion-country-id=' + data.final_country_id + ']');
		var $selected_country = $(".promotion-code-description[data-selected-country-flag = 'true']");

		$(".promotion-code-description[display != 'none']").hide();
		if ($final_country.length > 0) {
			$final_country.show();
		} else if ($selected_country.length > 0) {
			$selected_country.show();
		}

		// 検査フラグ、証明書フラグの設定
		var $select_part = $(target_form.alt_port_id);

		var inspection_value = 0;
		var inspection_text = "NO";
		var certificate_velue = 0;
		var certificate_text = "NO";

		if (data.certificate_type) {
			$('#insurance_str').text('YES');
			$('input[name=insurance]',target_form).val(1);

			// 検査フラグ
			var sp1 = data.certificate_type.sp1_flg;
			if (sp1 && sp1 != "0") {
				// INSURANCEが顧客選択可でかつ、初期値がNOの国
				// inspection_value = 1 or 0;
				inspection_value = data.certificate_type.ins_default;
				if(inspection_value=='1'){
					inspection_text = "YES";
				}else{
					inspection_text = "NO";
				}
			}

			// 証明書フラグ
			var cer = data.certificate_type.certificate_type;
			if (cer && cer != "0") {
				certificate_velue = 1;
				certificate_text = "YES";
			}
		}

		$('input[name=inspection]',target_form).val(inspection_value);
		$('#inspection_str').text(inspection_text);
		$('input[name=certificate]',target_form).val(certificate_velue);
		$('#certificate_str').text(certificate_text);

		// スキップ
		if (list) {
			return true;
		}

		// 港リスト
		if (data.port_list) {
			// リストクリア
			$select_part.empty();
			$select_part.append($('<option>').attr({value:''}).text('Select'));

			// 構築
			for (var val in data.port_list) {
				var name = data.port_list[val];
				$select_part.append($('<option>').attr({value:val}).text(name));
			}

			// This line is for I.E 7
			$select_part.val('')
		}

	};

	send_ajax(url,null,success_func,null);
}

/*
 * DUMP
 */
function dump(arr,level) {
	var dumped_text = "";
	if(!level)
		level = 0;

	// The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++)
		level_padding += "  ";

	if(typeof(arr) == 'object') { // Array/Hashes/Objects
		for(var item in arr) {
			var value = arr[item];

			if(typeof(value) == 'object') { // If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { // Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}

/* JSON によるパラメータ送信 */
function send_ajax(url, data, success_event_handler, error_event_handler)
{
	$.ajax({
		url: url,
		dataType: 'json',
		cache: false,
		data: data,
		success: success_event_handler,
		error: error_event_handler,
		type: 'POST',
		global: false
	});
}

/** Campaign Monitor用チェックボックスチェッカ */
function cm_checker()
{
	var $elem = {
		checkbox: $('.cm_checker .newsletter-signup-check'),
		submit: $('#newsletter-signup-submit')
	}
	function disabledAct(){
		if($elem.checkbox.prop('checked')){
			$elem.submit.attr('disabled', false).removeClass('disabled');
		}else{
			$elem.submit.attr('disabled', true).addClass('disabled');
		}
	}
	// 読み込み時にチェックを行う
	disabledAct();
	// クリックした再にチェックを行う
	$elem.checkbox.on('click', function(){
		disabledAct();
	});
}

/* 使用ブラウザ判定(favorite.js のコピペ)
 * TODO
 * src\html\js\favorite.js::isSafari()
 * src\html\js_lang\favorite.js::isSafari()
 * について削除しても問題なければ削除する
 */
function isSafari() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('edg') !== -1 ||
        userAgent.indexOf('edge') !== -1 ||
        userAgent.indexOf('edga') !== -1 ||
        userAgent.indexOf('edgios') !== -1) {
        // edge
    } else if (userAgent.indexOf('opera') !== -1 || userAgent.indexOf('opr') !== -1) {
        // opera
    } else if (userAgent.indexOf('chrome') !== -1 || userAgent.indexOf('crios') !== -1) {
        // chrome
    } else if (userAgent.indexOf('firefox') !== -1 || userAgent.indexOf('fxios') !== -1) {
        // firefox
    } else if (userAgent.indexOf('safari') !== -1) {
        // safari
        return true;
    } else if (userAgent.indexOf('msie') !== -1 || userAgent.indexOf('trident') !== -1) {
        // ie
    }
    return false;
}

/* 自身で変更した表示言語を保存 */
function set_language_cookie(lang) {
    /* ITPによるCookieの有効期限対応 */
    if (isSafari()) {
        set_language_cookie_ajax(lang);
    } else {
        /* Cookieの有効期限(1年)等 設定情報 */
        var cookie_option = "; path=/; domain=.beforward.jp; max-age=31536000;";
        /* 自身で変更したLanguageを保存 */
        document.cookie = "wwwbf[Language]=" + encodeURIComponent(lang) + cookie_option;
    }
}

function set_language_cookie_ajax(lang){
    var langPath = '/';
    if (lang != 'en') {
        langPath = '/' + lang + '/';
    }

    $.ajax({
        url: langPath + 'ajax/set_language_cookie',
        type: 'GET',
        data: { lang: lang },
        cache: false,
        async: false,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus + ' ' + errorThrown);
        }
    });
}
