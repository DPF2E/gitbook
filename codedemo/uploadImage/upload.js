function initUpload(){
   /*初始化方法*/
    Upload().init({
        maxNum: 9,
        mapiUrl: data.upload_api,
        businessType: '',
        uploadUrl: data.upload_url,
        token: data.upload_token,
        sign: data.upload_sign,
        oneComplete: oneComplete,
        allComplete: function a(){ }
    });

    /*成功上传后的回调方法*/
    function oneComplete(json) {
        if (!json || !json.picId) {
            return;
        }
        var el = $(createImgStr(json));
        $('.upload-box').prepend(el);

        // 判断是否需要隐藏“上传图片”字样
        showAddPicTextIfNeeded();
        // 判断是否需要隐藏上传图片按钮
        showAddPicBtnIfNeeded();
        $('.J_close').on('tap', function() {
	    	$(this).parent().remove();
	    	showAddPicTextIfNeeded();
	    	showAddPicBtnIfNeeded();
	    })

    };
    // 根据需要隐藏添加图片按钮
	function showAddPicBtnIfNeeded() {
		if ($('.upload-box img').length >= MAX_UPLOAD_PIC_COUNT) {
			addPicEl.parent().addClass('Hide');
		}
		else {
			addPicEl.parent().hasClass('Hide') && addPicEl.parent().removeClass('Hide');
		}
	}
	// 判断是否需要隐藏“上传图片”字样
	function showAddPicTextIfNeeded() {
		if($('.upload-box img').length >= 1) {
			$('.upload-info').hide();
		}
		else {
			$('.upload-info').show();
		}
	}
	// 根据相对url生成最终的预览元素
	function createImgStr(picObj) {
		return '<div class="upload-item" data-id="'+ picObj.picId +'" data-url="' + picObj.url + '"><img class="img-preview" src="http://i'+ Math.ceil(Math.random()*3) +'.s'+ Math.ceil(Math.random()*3) + FDomain + picObj.url +'(277c277)/thumb.jpg" /><a href="javascript:;" class="pic-close J_close"></a></div>';
	}
}

function Upload() {
	var config = {
	    maxNum: 1, // limit number of files to upload
	    mapiUrl: '', // mapi url (only necessary for native upload)
	    businessType: 'h5', // (optional, necessary for native upload) 
	    uploadUrl: '', // url to upload file (both for h5 and native upload)
	    token: '', // necessary param for upload
	    sign: '', // necessary parm for upload
	    exceedLimitCallback: function() { // it will be called if number of files to be uploaded has exceed the limit
	        console.log('number of files to be uploaded has exceed the limit');
	    },
	    oneComplete: function(response) { // it will be invokded in the order of picture selected whatever success or not
	        console.log('one pic has been uploaded' + response);
	    },
	    allComplete: function(responses) { // it will be invokded after all picture uploaded whatever success or not
	        console.log('all pics has been uploaded, count of file uploaded is ' + responses.length);
	    }
	};

	var addPicEl = $('.J_uploadPic'),
	    completeResponses = [],
	    filesToBeUpload = 0;

	/**
	 * use xhr2 to upload pic
	 **/
	function h5Init() {
	    var hiddenInputFileEl = '<input type="file" id="J_file" name="dpfile" style="display:none;" multiple="multiple"/>';
	    $('body').append(hiddenInputFileEl);

	    var inputFileEl = $('#J_file');
	    inputFileEl.on('change', function(e) {
	        /*开始动作,添加一些监听*/
	        config['beforeExcuteCallback'] && config['beforeExcuteCallback']();
	        var files = e.target.files;
	        if (files && files.length > config.maxNum) {
	            config.exceedLimitCallback.apply();
	            return;
	        }
	        /*清空原来的页*/
	        completeResponses.length = 0;
	        filesToBeUpload = files.length;
	        for (var i = 0, len = files.length; i < len; i++) {
	            var file = files[i];
	            uploadFileByXHR2(file);
	        }
	    });

	    // bind upload pic event
	    addPicEl.on('click', function() {
	        /*first,if exists validateCallBack...*/
	        if (config['validateCallback'] && (!config['validateCallback']())) {
	            return;
	        }
	        inputFileEl.click();
	    });
	}

	function uploadFileByXHR2(file) {
	    var dataToSend = new FormData();
	    dataToSend.append('nut', config.token);
	    dataToSend.append('sign', config.sign);
	    dataToSend.append('file', file);

	    var xhr = new XMLHttpRequest();
	    xhr.open('POST', config.uploadUrl);
	    xhr.onreadystatechange = onReadyStateHandler;
	    xhr.send(dataToSend);
	}

	// callback for xhr2
	function onReadyStateHandler() {
	    if (event.target.readyState == 4 && event.target.status == 200) {
	        var response = JSON.parse(event.target.responseText);
	        oneUploaded(response);
	    } else if (event.target.readyState == 4) {
	        oneUploaded({
	            code: event.target.status
	        });
	    }
	}

	function oneUploaded(response) {
	    config.oneComplete.call(null, response);
	    completeResponses.push(response);
	    if (completeResponses.length == filesToBeUpload) {
	        config.allComplete.call(null, response);
	    }
	}

	return {
		init: function(option) {
			config = (option ? option : config);
			h5Init();
		}
	}
}
initUpload();