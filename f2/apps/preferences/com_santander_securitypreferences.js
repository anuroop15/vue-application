/* eslint-disable */
F2.Apps['com_santander_securitypreferences'] = (function() {
	var App_Class = function(appConfig, appContent, root) {
		this.appConfig = appConfig;
		this.appContent = appContent;
		this.root = root;
	}

	App_Class.prototype.init = function() {
		// Store oAuth access token in session storage
		sessionStorage.setItem(
			"santander-f2-apps-access-token",
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
        santander_f2_apps_i18nChange(locale)
	}
	
	App_Class.prototype._handleLocaleChange = function(locale) {
		santander_f2_apps_i18nChange(locale)
	}

	return App_Class;
})();