/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	 config.image_previewText=' '; //预览区域显示内容  
	config.filebrowserImageUploadUrl = "/public_platform/file/ckupload";//图片上传路径
	// Define changes to default configuration here. For example:	
	config.height = 300;
	config.toolbarCanCollapse = true;
};
