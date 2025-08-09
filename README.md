Command to perform automation with javascript - selenium

// initialise project
1. npm init -y

// install selenium
2. npm i selenium-webdriver

// create folder and files
3. mkdir tests
4. cd tests
5. touch firstTest.js
6. cd ..
7. touch .gitignore

// Run Selenium script without test framework (initially)
8.    node ./tests/firstTest.js

// To get the test report we need to run to Install Mocha & Allure dependencies
9.    npm install --save-dev mocha mocha-allure-reporter allure-commandline

10. To run the test javascript automation script : 
    npm test

11. Install Java 8 or higher ( needed for Allure CLI )

12. Generate and view report :

    allure generate allure-results --clean -o allure-report
    allure open allure-report
        
        OR ( if script in package.json is modified then with addition of
            "report": "allure generate allure-results --clean -o allure-report && allure open allure-report" in the script then )

    Generate and view allure report just by
        npm run report
    
    To exit from allure report web server session hit CTRL+C 