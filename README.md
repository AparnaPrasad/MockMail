###Mock Mail - email client with React

Single page application, which displays emails of a user.

Optional Requirement
Delete mails using checkbox and delete button

Implementation details
1. This application uses react context for state management.
2. On receiving the data, data is parsed and stored by user and by folder for reducing access time.
3. For storing and accessing data, combination of (sender id + receiver id + and time stamp )is used as unique ID for each mail
4. Jest and Enzyme is used for testing
5. Styled component and React bootstrap are used for styling.
6. React-intl is used for date and time.

Bugs and limitaion
1. Since I am storing data folder wise and user wise, it takes more time store this data during data fetch. This is a trade off to save time during folder change.
2. Not a lot of emphasis has been made on styling, there could be styling issues.


