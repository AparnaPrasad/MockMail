# Mock Mail - email client with React #

_Single page application, which displays emails of a user._

**Set up**

_Requires node v10 or higher_
From project root directory:
1. npm i
2. node server 
3. npm start

**Demo**
![](http://g.recordit.co/eM709tcLYl.gif)

**Implementation details**

1. This application uses React context for state management.
2. Uses Typescript for type safety
3. On receiving the data, data is parsed and stored by user and by folder for reducing access time.
4. For storing and accessing data, combination of (sender id + receiver id + and time stamp )is used as unique ID for each mail
5. Jest and Enzyme is used for testing
6. Styled component and React bootstrap are used as styling and component library.
7. React-intl is used for date and time.

**Bugs and limitaion**

1. Since I am storing data folder wise and user wise, it takes more time store this data during data fetch. This is a trade off to save time during folder change.
2. Not a lot of time has been spent on styling, assumptions have been made regarding exact colors and font, font size. 
3. Search bar does not contain search icon. 
4. Add E2E testing. Add more unit tests


