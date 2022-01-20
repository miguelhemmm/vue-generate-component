/**
 * BuildTpl
 */
 class BuildTpl {
    /**
     *
     * @param name - the component name
     */
    constructor( name, postfix ) {
      this.type = 'build';
      this.isBuild = true;
      this.name = postfix ? `${name}.${postfix}` : name;
    }
  }
  
  export default BuildTpl;