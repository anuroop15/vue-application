/* eslint-disable */
F2.Apps['com_banking_documents_to_sign'] = (function() {
	var App_Class = function(appConfig, appContent, root) {
		this.appConfig = appConfig;
		this.appContent = appContent;
		this.root = root;
	}

	App_Class.prototype.init = function() {
		// Store oAuth access token in session storage
		sessionStorage.setItem(
			"banking-f2-apps-access-token",
			this.appConfig.context.accessToken
		);
		
		F2.Events.on(
			'changeLanguage',
			this._handleLanguageChange
		);

		F2.Events.on(
			F2.Constants.Events.CONTAINER_LOCALE_CHANGE,
			this._handleLocaleChange
		);
	}

	App_Class.prototype._handleLanguageChange = function(locale) {
        banking_signatureDocs(locale)
	}
	
	App_Class.prototype._handleLocaleChange = function(locale) {
		banking_signatureDocs(locale)
	}

	return App_Class;
})();