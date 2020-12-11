## What is it? 

This is Bloom Randomizer app built with React JS. It utilizes Facebook Graph API to fetch Instagram Post Comments and returns a random one - the winner comment.

## Randomizer Flow:

1. There are two options we have on page load:
* User isn't logged in (the app has no access token) so they get a button to sign in with their Facebook account. There's a handy pop up on the bottom in case help is needed.

* User is logged in (the app has the access token) and they see the input field right await.

2. Into the input field User pastes the url link of their IG Post they want to fetch a random comment from.

3. The app validates the input. If the validation fails, there are two different pop up messages to be displayed depending on the error.

4. Then, the app displays the loader with the comments count.

5. After the comment data is fetched, it is displayed on the screen.

6. In the end, User may do one of the following things:
    * fetch another comment (there's always going to be a new unique winner, no duplicates) by clicking on "Еще рандом"
    * do another give-away by clicking on "Другой Пост"
    * sign out in case another instagram account should be used

## Use it! 

All apps using Facebook API should undergo a check by Facebook to go live. 

As of now, due to Facebook taking too long to review the app, it is not in the live mode. 

Nevertheless, you can test it. 

Test FB Account - thomradioo@gmail.com, the password - Randomizer1! . The account attached is https://www.instagram.com/testernikita/

You can use either of the posts there to test the app.

;)

