module.exports = {
	// moduleNameMapper: {
	//   '^@/(.*)$': '<rootDir>/$1',
	//   '^~/(.*)$': '<rootDir>/$1',
	// },
	// modulePathIgnorePatterns: ['<rootDir>/cypress/'],
	moduleFileExtensions: ['ts', 'js', 'json'],
	transform: { // The order is important. Vue must comme first.
		'^.+\\.ts?$': 'ts-jest',
		'^.+\\.js$': 'babel-jest'
	},
	verbose: true,
  testMatch: [
			"**/__tests__/**/*.spec.+(ts|tsx)"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  //testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
	// testPathIgnorePatterns: [
	//   '<rootDir>/node_modules/',
	//   '<rootDir>/coverage/',
	//   // '<rootDir>/src/tests/',
	//   '<rootDir>/.*\\.js',
	//   '<rootDir>/.*\\.json',
	// ],
	// transformIgnorePatterns: ['<rootDir>/node_modules/'],
	// snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue']
	collectCoverage: true,
	collectCoverageFrom: [
		'<rootDir>/src/**/*.ts',
		'<rootDir>/src/**/*.js',
	]
}



//   "globals": {
//     "ts-jest": {
//       "tsConfigFile": "tsconfig.json"
//     }
//   },
