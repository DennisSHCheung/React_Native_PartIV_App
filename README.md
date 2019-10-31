*********************Group 129 - Computer Vision for Assistive Technology*********************
***************************************Phone Application**************************************
Author: Dennis Cheung

Requirements:
1) Has Node.js installed
2) A phone charging cable
3) A smartphone

Steps to run:
1) If you don't already have Expo cli, open terminal and paste: npm i expo-cli
2) Next: npm run
3) Connect your smartphone to your computer and ensure debugging mode is turned on
(Each smartphone has a different way of enabling debugging mode)
4) When expo cli is finished initializing, you will see a huge QR code. Press a on your keyboard
5) A connection should now be starting up on your cellphone.
6) Guest account: 111, password: 222
7) If "server is not available" shown up, you may be required to change a small piece of code to bypass
the login screen

=======What to do when the server is down=======
When the server is down, all information are not available for access. This would require you to
hardcode some values in order to view/use the app
How to bypass the login screen:
1) Navigate to Navigator.js
2) Comment out the line: const AppContainer = createAppContainer(AppNavigator);
3) Uncomment the following line
4) npm run 
Although this would bypass the login screen, the app would be trying to connect to the server
and this might cause expo to produce annoying warnings on your screen. In order to resolve this,
comment out the function "componentDidMount" in both HomeScreen.js and DetailScreen.js

You may wonder why the pie-chart and the bar-chart have values on them, this is because they are
already being hardcoded before submission. If you would like to change it back to reading values from
the server, in DetailScreen.js, comment out data variable inside chartData and uncomment the data variable
underneath. For the pie-chart, inside pieData variable, change the variable "value" to value: {"standing"} 
or any other postures.
