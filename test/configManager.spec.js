import {ConfigManager, configure, GlobalConfig} from '../src/aurelia-config';
import {Aurelia} from 'aurelia-framework';
import {DefaultLoader} from 'aurelia-loader-default';
import {Container} from 'aurelia-dependency-injection';
import {Config} from './resources/testConfig';
import {Config as OtherConfig} from './resources/otherTestConfig';

describe('configManager', function() {
  describe('configure with globalRegister', function() {
    let aurelia;

    beforeEach(() => {
      aurelia = getAurelia();
      configure(aurelia, {
        plugins: [
          {moduleId: 'test/resources/testConfig', alias: 'plugin-config', config: {data:'xy'}},
          {moduleId: 'test/resources/otherTestConfig', config: {data:'xy'}},
          {moduleId: 'global-config', config: {data:'xy'}}
        ]
      });
    });

    it('Should have registered and merged GlobalConfig with global alias', function(done) {
      aurelia.start().then(()=>{
        let configGlobal = aurelia.container.get('global-config');
        expect(configGlobal instanceof GlobalConfig).toBe(true);
        expect(JSON.stringify(configGlobal)).toBe(JSON.stringify({data: 'xy'}));
        done();
      });
    });

    it('Should have registered and merged Config with global alias', function(done) {
      aurelia.start().then(()=>{
        let configByAlias = aurelia.container.get('plugin-config');
        expect(configByAlias instanceof Config).toBe(true);
        expect(JSON.stringify(configByAlias)).toBe(JSON.stringify({key: 'value', data: 'xy'}));
        done();
      });
    });

    it('Should have registered and merged Config with Config contructor', function(done) {
      aurelia.start().then(()=>{
        let configByClass = aurelia.container.get(Config);
        expect(configByClass instanceof Config).toBe(true);
        expect(JSON.stringify(configByClass)).toBe(JSON.stringify({key: 'value', data: 'xy'}));
        done();
      });
    });

    it('Should have registered and merged Config with ConfigManager', function(done) {
      aurelia.start().then(()=>{
        let configByConfigManager = aurelia.container.get(ConfigManager).configs['plugin-config'];
        expect(configByConfigManager instanceof Config).toBe(true);
        expect(JSON.stringify(configByConfigManager)).toBe(JSON.stringify({key: 'value', data: 'xy'}));
        done();
      });
    });

    it('Should have registered and merged Config with global default alias', function(done) {
      aurelia.start().then(()=>{
        let configByModuleId = aurelia.container.get('test\/resources\/otherTestConfig-config');
        expect(configByModuleId instanceof OtherConfig).toBe(true);
        expect(JSON.stringify(configByModuleId)).toBe(JSON.stringify({key: 'value', data: 'xy'}));
        done();
      });
    });

    it('Should have registered and merged Config with ConfigManager and default alias', function(done) {
      aurelia.start().then(()=>{
        let configByConfigManager = aurelia.container.get(ConfigManager).configs['test\/resources\/otherTestConfig-config'];
        expect(configByConfigManager instanceof OtherConfig).toBe(true);
        expect(JSON.stringify(configByConfigManager)).toBe(JSON.stringify({key: 'value', data: 'xy'}));
        done();
      });
    });
  });

  describe('configure without registerAlias', function() {
    let aurelia;

    beforeEach(() => {
      aurelia = getAurelia();
      configure(aurelia, {
        plugins: [
          {moduleId: 'test/resources/testConfig', alias: 'plugin-config', config: {data:'xy'}},
          {moduleId: 'test/resources/otherTestConfig', config: {data:'xy'}},
          {moduleId: 'global-config', config: {data:'xy'}}
        ],
        registerAlias: false
      });
    });

    it('Should not have registered and merged GlobalConfig with global alias', function(done) {
      aurelia.start().then(()=>{
        let configGlobal = aurelia.container.get('global-config');
        expect(configGlobal instanceof GlobalConfig).toBe(false);
        done();
      });
    });

    it('Should not have registered and merged Config with global alias', function(done) {
      aurelia.start().then(()=>{
        let configByAlias = aurelia.container.get('plugin-config');
        expect(configByAlias instanceof Config).not.toBe(true);
        done();
      });
    });

    it('Should have registered and merged Config with Config contructor', function(done) {
      aurelia.start().then(()=>{
        let configByClass = aurelia.container.get(Config);
        expect(configByClass instanceof Config).toBe(true);
        expect(JSON.stringify(configByClass)).toBe(JSON.stringify({key: 'value', data: 'xy'}));
        done();
      });
    });

    it('Should have registered and merged Config with ConfigManager', function(done) {
      aurelia.start().then(()=>{
        let configByConfigManager = aurelia.container.get(ConfigManager).configs['plugin-config'];
        expect(configByConfigManager instanceof Config).toBe(true);
        expect(JSON.stringify(configByConfigManager)).toBe(JSON.stringify({key: 'value', data: 'xy'}));
        done();
      });
    });

    it('Should not have registered and merged Config with global default alias', function(done) {
      aurelia.start().then(()=>{
        let configByModuleId = aurelia.container.get('test\/resources\/otherTestConfig-config');
        expect(configByModuleId instanceof OtherConfig).toBe(false);
        done();
      });
    });

    it('Should have registered and merged Config with ConfigManager and default alias', function(done) {
      aurelia.start().then(()=>{
        let configByConfigManager = aurelia.container.get(ConfigManager).configs['test\/resources\/otherTestConfig-config'];
        expect(configByConfigManager instanceof OtherConfig).toBe(true);
        expect(JSON.stringify(configByConfigManager)).toBe(JSON.stringify({key: 'value', data: 'xy'}));
        done();
      });
    });
  });
});

function getAurelia() {
  return new Aurelia(new DefaultLoader, new Container);
}