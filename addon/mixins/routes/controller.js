// Generated by CoffeeScript 1.8.0
import Ember from 'ember';
import Breadcrumbs from 'emberadmin/logics/breadcrumbs';
import SiteTitle from 'emberadmin/logics/site-title';
var controllerMixin;

controllerMixin = Ember.Mixin.create({
  _getForm: function(controller) {
    var form;
    form = "%@_form".fmt(this._controllerName(controller).decamelize());
    if (Ember.TEMPLATES[form]) {
      return form;
    }
    if (Ember.TEMPLATES["admin/%@".fmt(form)]){
      return form;
    }
    return "form";
  },
  _getControllerTemplate: function(controller) {
    var name;
    name = this._controllerName(controller);
    if (this.action) {
      name = "%@/%@".fmt(name, this.action);
    }
    if (name === "dashboard") {
      return "admin/dashboard";
    }
    if (Ember.TEMPLATES[name] || Ember.TEMPLATES["admin/%@".fmt(name)]) {
      return name;
    } else {
      if (this.action && this.action !== "page") {
        return "admin/%@".fmt(this.action);
      } else {
        return "admin/main";
      }
    }
  },
  _controllerName: function(controller) {
    return this.controllerName || (this.controllerName = controller._debugContainerKey.split(":")[1].replace(/(\/[Ss]how)|(\/[Ee]dit)|(\/[Nn]ew)/, ''));
  },
  _setActiveRoute: function(controller) {
    var url;
    url = this._controllerName(controller);
    return this.controllerFor("navigation").set('activeMenu', url);
  },
  _setAction: function(action) {
    if (action !== "index") {
      return this.action = action;
    }
  },
  _checkAction: function(options, target) {
    if (/\./.test(target)) {
      target = target.split(".")[1];
      if (target) {
        return options.action = target;
      }
    }
  },
  _setupBreadscrumbs: function(controller, model) {
    return Breadcrumbs.setup(this.action, controller, model, this.controllerFor('breadcrumbs'));
  },
  _setSiteTitle: function(controller, model) {
    return SiteTitle.setup(this._controllerName(controller), model, this.action);
  }
});

export default controllerMixin;
