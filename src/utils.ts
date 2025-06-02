export const formatProjectName = (name: string): string => {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const getProjectFeatures = (): string[] => {
  return [
    'React 18 with TypeScript',
    'Webpack 5 bundling',
    'Tailwind CSS styling',
    'Jest testing framework',
    'Hot reload development'
  ];
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
