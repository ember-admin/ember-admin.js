// Generated by CoffeeScript 1.8.0
import Ember from 'ember';
import Attributes from 'ember-cli-admin/dsl/attributes';
var attributesMixin;

attributesMixin = Ember.Mixin.create({
  formAttributes: (function() {
    return Attributes.withoutId(this.get("model").constructor);
  }).property('modelAttributes.@each'),

  tableAttributes: (function() {
    return this.get('modelAttributes');
  }).property('modelAttributes.@each'),

  fileuploads: (function() {
    if (this.get('model.fileuploads')) {
      return this.get('model.fileuploads');
    }
  }).property('model.fileuploads'),

  activeTableAttributes: function(){
    var type = this.toString().match(/:([^:]+)/)[1];
    var hiddenAttributes = this.tableSettingsStore.get(type);
    var attributes = this.get('tableAttributes');
    var returnValue = attributes.filter(function(attr){
      return !hiddenAttributes.some(function(hiddenAttr){
        return hiddenAttr === attr;
      });
    });
    return returnValue;
  }.property(),

  isActive: function(attribute, value){
    var model = attribute;
    var currentController = this._getCurrentController();
    var hiddenAttributes = this.tableSettingsStore.get(currentController) || [];
    var isHidden = hiddenAttributes.some(function(attr){
        return attr === model;
      });

    if (value === undefined){
      return !isHidden;
    } else {
      if (isHidden){
        hiddenAttributes.splice(hiddenAttributes.indexOf(model), 1);
      } else {
        hiddenAttributes.push(model);
      }
      this.tableSettingsStore.set(currentController, hiddenAttributes);
      this._setActiveAttributes(hiddenAttributes, {async: true}); 
      return value;     
    }
  },

  _getCurrentController: function(){
    return this.toString().match(/:([^:]+)/)[1];
  },

  _setActiveAttributes: function(hiddenAttributes, options){
    var attributes = this.get('tableAttributes');
    var activeAttributes = attributes.filter(function(attr){
        return !hiddenAttributes.some(function(hiddenAttr){
          return hiddenAttr === attr;
        });
      });

    if (options && options.async){
      window.setTimeout((function(_this){
        return function(){
          _this.set('activeTableAttributes', activeAttributes);  
        };
      })(this), 0);
    } else {
      this.set('activeTableAttributes', activeAttributes);
    }
  },

  actions: {
    openModalSettings: function(){
      this.send('openModal', Ember.Object.extend({}),
       'admin.base.filter-columns-modal');
    }
  }
  
});

export default attributesMixin;
