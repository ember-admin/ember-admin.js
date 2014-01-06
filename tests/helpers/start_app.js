function startApp(attrs) {
  var App;

  var attributes = Ember.merge({
    // useful Test defaults
    rootElement: '#ember-testing',
    LOG_ACTIVE_GENERATION:false,
    LOG_VIEW_LOOKUPS: false
  }, attrs); // but you can override;

  Ember.run.join(function(){
    App = window.Admin.create(attributes);
    App.setupForTesting();
    App.injectTestHelpers();
  });

  App.Router.map(function(){
    this.route("dashboard", { path: '/' } );
  });

  App.Router.reopen({
    location: 'none'
  });

  App.reset(); // this shouldn't be needed, i want to be able to "start an app at a specific URL"

  fixtures(App);

  return App;
}

function fixtures(App) {

  // todo add pagination for this
  DS.FixtureAdapter.reopen({
    queryFixtures: function(records, query, type) {
      return records
    }
  });

  App.ApplicationAdapter = DS.FixtureAdapter.extend();

  App.AvatarAdapter = App.ApplicationAdapter.extend(Admin.FileuploadAdapterMixin);

  App.Avatar = Admin.Asset.extend({
    type: DS.attr('string', {defaultValue: "Avatar"})
  });

  App.Avatar.FIXTURES = [];

  App.Avatar.FIXTURES.push(
    {
      "id":1,
      "assetable_id":1,
      "assetable_type":"Person",
      "guid":null,
      "type":"Avatar",
      "original_filename": "f61112c5023fc6a9b5b20a620cffa587",
      "thumb_url":"http://ru.gravatar.com/userimage/59502193/f61112c5023fc6a9b5b20a620cffa587.png",
      "url":"http://ru.gravatar.com/userimage/59502193/f61112c5023fc6a9b5b20a620cffa587.png"
    }
  );


  App.Person = DS.Model.extend({
    name:        DS.attr('string'),
    age:         DS.attr('number'),
    gender:      DS.attr('string'),
    birthday:    DS.attr('date'),

    address:     DS.belongsTo('address'),
    avatar:      DS.belongsTo('Avatar')
  });

  App.Person.FIXTURES = [];

  var i, _i;
  for (i = _i = 1; _i <= 5; i = ++_i) {
    App.Person.FIXTURES.push({
      id:       i,
      name:     chance.name(),
      age:      chance.age(),
      gender:   chance.gender(),
      birthday: chance.birthday(),
      address:  i,
      avatar:   1
    });
  }

  App.Address = DS.Model.extend({
    address:   DS.attr('string'),
    phone:     DS.attr('string'),
    street:    DS.attr('string'),
    latitude:  DS.attr('number'),
    longitude: DS.attr('number')
  });

  App.Address.FIXTURES = [];

  for (i = _i = 1; _i <= 5; i = ++_i) {
    App.Address.FIXTURES.push({
      id:        i,
      address:   chance.address(),
      phone:     chance.phone(),
      street:    chance.street(),
      latitude:  chance.latitude(),
      longitude: chance.longitude()
    });
  }

  window.App = App;


  //Todo add fixtures for avatar

  Admin.MetaRoute.map(App.Router, function(){
    this.resources('persons');
    this.resources('addresses');
  });

  Admin.DSL.Navigation.map(function(){
    this.navigate('Dashboard', {route: ""});
    this.navigate('System', function(){
      this.navigate('Persons', {route: "persons"});
      this.navigate('Addresses');
    });
  });
}