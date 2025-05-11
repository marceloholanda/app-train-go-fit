
// Environment mapping utilities

/**
 * Maps the environment selection to a standardized type
 */
export const mapEnvironment = (environment: string): 'gym' | 'home' | 'outdoor' => {
  if (environment === 'gym') {
    return 'gym';
  } else if (environment === 'home_with_equipment' || environment === 'home_no_equipment') {
    return 'home';
  } else if (environment === 'outdoor') {
    return 'outdoor';
  }
  
  // Default value
  return 'gym';
};
