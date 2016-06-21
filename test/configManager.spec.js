import {ConfigManager, configure, GlobalConfig, BaseConfig} from '../src/aurelia-config';
import {Aurelia} from 'aurelia-framework';
import {DefaultLoader} from 'aurelia-loader-default';
import {Container} from 'aurelia-dependency-injection';
import {Config} from './resources/testConfig';
import {OtherConfig} from './resources/otherTestConfig';

describe('configManager', function() {
  describe('configure with globalRegister', function() {
    let aurelia;

    beforeEach(() => {
      aurelia = getAurelia();
      configure(aurelia, {
        plugins: [
          {moduleId: 'test/resources/testConfig', alias: 'plugin-config', config: {data:'xy'}},
          {moduleId: 'test/resources/otherTestConfig', className: 'OtherConfig', config: {data:'xy'}},
          {moduleId: 'global-config', config: {data:'xy'}}
        ]
      });
    });

    it('Should have registered and merged GlobalConfig with global alias', function(done) {
      aurelia.start().then(()=>{
        let configGlobal = aurelia.container.get('global-config');
        expect(configGlobal instanceof GlobalConfig).toBe(true);
        expect(configGlobal instanceof BaseConfig).toBe(true);
        expect(JSON.stringify(configGlobal.current)).toBe(JSON.stringify({data: 'xy'}));
        done();
      });
    });

    it('Should have registered and merged Config with global alias', function(done) {
      aurelia.start().then(()=>{
        let configByAlias = aurelia.container.get('plugin-config');
        expect(configByAlias instanceof Config).toBe(true);
        expect(configByAlias instanceof BaseConfig).toBe(true);
        expect(JSON.stringify(configByAlias.current)).toBe(JSON.stringify({key: 'value', data: 'xy'}));
        done();
      });
    });

    it('Should have registered and merged Config with Config contructor', function(done) {
      aurelia.start().then(()=>{
        let configByClass = aurelia.container.get(Config);
        expect(configByClass instanceof Config).toBe(true);
        expect(configByClass instanceof BaseConfig).toBe(true);
        expect(JSON.stringify(configByClass.current)).toBe(JSON.stringify({key: 'value', data: 'xy'}));
        done();
      });
    });

    it('Should have registered and merged Config with ConfigManager', function(done) {
      aurelia.start().then(()=>{
        let configByConfigManager = aurelia.container.get(ConfigManager).configs['plugin-config'];

        expect(configByConfigManager instanceof Config).toBe(true);
        expect(configByConfigManager instanceof BaseConfig).toBe(true);
        expect(JSON.stringify(configByConfigManager.current)).toBe(JSON.stringify({key: 'value', data: 'xy'}));
        done();
      });
    });

    it('Should have registered and merged Config with global default alias', function(done) {
      aurelia.start().then(()=>{
        let configByModuleId = aurelia.container.get('test\/resources\/otherTestConfig-config');
        expect(configByModuleId instanceof OtherConfig).toBe(true);
        expect(configByModuleId instanceof BaseConfig).toBe(true);
        expect(JSON.stringify(configByModuleId.current)).toBe(JSON.stringify({key: 'value', data: 'xy'}));
        done();
      });
    });

    it('Should have registered and merged Config with ConfigManager and default alias', function(done) {
      aurelia.start().then(()=>{
        let configByConfigManager = aurelia.container.get(ConfigManager).configs['test\/resources\/otherTestConfig-config'];
        expect(configByConfigManager instanceof OtherConfig).toBe(true);
        expect(configByConfigManager instanceof BaseConfig).toBe(true);
        expect(JSON.stringify(configByConfigManager.current)).toBe(JSON.stringify({key: 'value', data: 'xy'}));
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
          {moduleId: 'test/resources/otherTestConfig', className: 'OtherConfig', config: {data:'xy'}},
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
        expect(configByClass instanceof BaseConfig).toBe(true);
        expect(JSON.stringify(configByClass.current)).toBe(JSON.stringify({key: 'value', data: 'xy'}));
        done();
      });
    });

    it('Should have registered and merged Config with ConfigManager', function(done) {
      aurelia.start().then(()=>{
        let configByConfigManager = aurelia.container.get(ConfigManager).configs['plugin-config'];
        expect(configByConfigManager instanceof Config).toBe(true);
        expect(configByConfigManager instanceof BaseConfig).toBe(true);
        expect(JSON.stringify(configByConfigManager.current)).toBe(JSON.stringify({key: 'value', data: 'xy'}));
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
        let configByConfigManager = aurelia.container.get(ConfigManager).configs['test/resources/otherTestConfig-config'];
        expect(configByConfigManager instanceof OtherConfig).toBe(true);
        expect(configByConfigManager instanceof BaseConfig).toBe(true);
        expect(JSON.stringify(configByConfigManager.current)).toBe(JSON.stringify({key: 'value', data: 'xy'}));
        done();
      });
    });
  });
});

function getAurelia() {
  return new Aurelia(new DefaultLoader, new Container);
}
