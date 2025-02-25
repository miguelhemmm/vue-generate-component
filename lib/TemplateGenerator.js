import path from 'path';
import swig from 'swig';
import fs from 'fs-extra';
import config from './config/config';

/**
 * TemplateGenerator
 */
class TemplateGenerator {

  
  /**
   * @param options
   */
  constructor( options ) {
    this.TEMPLATES_DIR = `${__dirname}/blueprints`;
    this._create(options);
    this.parentName = process.cwd().substr(process.cwd().lastIndexOf('\\') + 1);
    
  }

  /**
   *
   * @param options
   */
  _create(options = {}) {
    const { name, type, actions, postfix } = options;
    const filesType = config.getConfigFile().filesType;
    if( options.isDir ) {
      this._createDirectory(this._getDirPath(type), { name, actions, filesType, postfix }, filesType);
    } else if (options.isBuild) {
      this._createDirectory(this._getDirPath(type), { name, actions, filesType, postfix, type }, filesType);
     }
    else {
      const tpl = this._compileTpl(this._getSingleTpl(type), { name, actions, filesType });
      this._createFile(name, type, filesType.script, tpl);
    }
  }

  /**
   *
   * @param file
   * @param data
   * @returns {*}
   * @private
   */
  _compileTpl( file, { name, actions, filesType }, parentName ) {
    const compiled = swig.compileFile(file);
    const componentName = name.substring(name.lastIndexOf("/") + 1);
    return compiled({ name: componentName, actions, filesType, parentName });
  }

  /**
   *
   * @param name
   * @param fileType
   * @param type
   * @param tpl
   * @private
   */
  _createFile( name, type, fileType, tpl ) {
    fs.outputFile(this._createFilePath(name, type, fileType), tpl, function( err ) {
      if( err ) console.log(err);
    });
  }

  /**
   *
   * @param dirPath
   * @param fileType
   * @param data
   * @param parentName
   * @private
   */
  _createDirectory( dirPath, data, fileTypes) {
    fs.readdir(dirPath, ( err, dir ) => {
      const name = data.name;
      const parentName = this.parentName;

      const folder = data.type === 'build' && !process.cwd().includes('/src/builds') ? path.join(process.cwd() + '/src/builds', name) : path.join(process.cwd(), name);
      
      let filePath;
      dir.forEach(tempFile => {
        const compiled = this._compileTpl(`${dirPath}/${tempFile}`, data, parentName);
        let fileName = this._createFileName(tempFile, name, fileTypes, data.postfix, parentName);

        filePath = path.join(folder, fileName);

        fs.outputFile(filePath, compiled, function( err ) {
          if( err ) console.log(err);
        });
      });
    });
  }

  /**
   *
   * @param tempFile
   * @param name
   * @param fileTypes
   * @returns {*}
   * @private
   */
  _createFileName( tempFile, name, fileTypes, postfix ) {
    let newName = tempFile.replace(/temp/, name);
    
    if( newName.indexOf('tpl') > -1 ) {
      newName = newName.replace(/tpl./, '')
      newName = newName.replace(/extension/, fileTypes.html);
    }

    if( newName.indexOf('sty') > -1 ) {
      newName = newName.replace(/sty./, '')
      newName = newName.replace(/extension/, fileTypes.style);
    }

    if( newName.indexOf('script') > -1 ) {
      newName = newName.replace(/script./, '')
      newName = newName.replace(/extension/, fileTypes.script);
    }
    return newName;
  }

  /**
   *
   * @param type
   * @param extension
   * @returns {*}
   * @private
   */
  _getSingleTpl( type , extension = 'js') {
    if(type === 'single') {
      return `${this.TEMPLATES_DIR}/${type}/temp.vue`;
    }
    return `${this.TEMPLATES_DIR}/${type}/temp.${type}.${extension}`;
  }

  /**
   *
   * @param type
   * @returns {*}
   * @private
   */
  _getDirPath(type) {
    return `${this.TEMPLATES_DIR}/${type}`;
  }

  /**
   *
   * @param name
   * @param type
   * @param fileType
   * @returns {*}
   * @private
   */
  _createFilePath( name, type, fileType ) {
    if(type === 'single') {
      return path.join(process.cwd(), `${name}.vue`);
    }
    return path.join(process.cwd(), `${name}.${type}.${fileType}`);
  }
}

export default TemplateGenerator
