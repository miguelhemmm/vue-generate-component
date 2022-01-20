import ComponentTpl from './templates/ComponentTpl';
import BuildTpl from './templates/BuildTpl';
import DirectiveTpl from './templates/DirectiveTpl';
import SingleTpl from './templates/SingleTpl';
import TemplateGenerator from './TemplateGenerator';

/**
 * TemplateFactory
 */
class TemplateFactory {

  /**
   * Factory to generate the templates
   * @param cli options
   */
  static createTemplateFor( cli ) {

    /**
     * Generate Vue 3 component
     */
    if( cli.component ) {
   
      return new TemplateGenerator(new ComponentTpl(cli.component, cli.postfix));
    }

        /**
     * Generate Vue 3 build component for a new brand
     */
         if( cli.build ) {
   
          return new TemplateGenerator(new BuildTpl(cli.build, cli.postfix));
        }

    /**
     * Generate Vue 3 directive
     */
    if( cli.directive ) {
      return new TemplateGenerator(new DirectiveTpl(cli.directive));
    }

    /**
     * Generate Vue 3 single file component
     */
    if( cli.single ) {
      return new TemplateGenerator(new SingleTpl(cli.single, cli.folder));
    }

  }

}

export default TemplateFactory
