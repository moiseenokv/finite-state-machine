class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(arguments.length < 1) {
          throw new Error('config is undefined');
        }
        this.config = config;
        this.prevState='';
        this.currentState=this.config.initial;
        this.nextState='';
      }
  
      /**
       * Returns active state.
       * @returns {String}
       */
      getState() {
          return this.currentState;
      }
  
      /**
       * Goes to specified state.
       * @param state
       */
      changeState(state) {
          if(this.config.states[state] === undefined){
              throw new Error('State is undefined by config. So, Fuck Off!');
          }
          this.prevState=this.currentState;
          this.currentState = state;
      }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(this.config.states[this.currentState].transitions[event] === undefined){
            throw new Error('Event is undefined by config. So, Fuck Off!');
        }
        this.prevState = this.currentState;
        this.currentState = this.config.states[this.currentState].transitions[event];
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.prevState=this.currentState;
        this.currentState = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        const arr = Object.keys(this.config.states).filter(function (item) {
            return item;
        });

        if(arguments.length < 1){ return arr }

        return arr.filter((state) =>{
            if(this.config.states[state].transitions[event]!==undefined){
                return state;
            }
        }); 
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.prevState==''){
            return false
        } else{
            this.nextState = this.currentState;
            this.currentState = this.prevState;
            this.prevState = '';
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.nextState==''){
            return false
        }else{
            this.prevState = this.currentState;
            this.currentState = this.nextState;
            this.nextState='';
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.prevState='';
        this.nextState='';
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
