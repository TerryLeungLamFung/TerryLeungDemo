import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function replace(...args) {
  if (navigationRef.isReady()) {
    try {
      navigationRef.current.dispatch(StackActions.replace(...args));
    } catch (e) {
      console.log(e);
    }
  }
}

// Push one screen forward in the current stack
export function push(...args) {
  if (navigationRef.isReady()) {
    try {
      navigationRef.current.dispatch(StackActions.push(...args));
    } catch (e) {
      console.log('navigationRef push ', e);
    }
  }
}

// Pull screen(s) backward in the current stack
export function pop(...args) {
  if (navigationRef.isReady()) {
    try {
      navigationRef.current.dispatch(StackActions.pop(...args));
    } catch (e) {
      console.log(e);
    }
  }
}

export function navigate(...args) {
  if (navigationRef.isReady()) {
    try {
      navigationRef.current.navigate(...args);
    } catch (e) {
      console.log(e);
    }
  }
}

// Pull one screen backward in the current stack
export function popToTop() {
  if (navigationRef.isReady()) {
    try {
      navigationRef.current.dispatch(StackActions.popToTop);
    } catch (e) {
      console.log(e);
    }
  }
}

export function reset(...args) {
  if (navigationRef.isReady()) {
    try {
      navigationRef.current.reset(...args);
    } catch (e) {
      console.log(e);
    }
  }
}

export function goBack(...args) {
  if (navigationRef.isReady()) {
    try {
      navigationRef.current.goBack(...args);
    } catch (e) {
      console.log(e);
    }
  }
}
