# .env file
JWT_secret=108Stars

mlab_user=admin

mlab_password=Adm1n1strator

googleClientId=948254138064-hh07f9ka4k2kgbs0spgqoho7lhvgvb4v.apps.googleusercontent.com

# link Deploy
http://xavier-ho-client.thenile.online/


# WIP:
- no google sign in (deploy)
- no background features

# Tasks completed Today (Nov 23, 18)
- fixed edit answer
- fixed edit question
- Google Sign in (local only)
- added WYSIWYG

# Bugs with GCP:
- Refreshing any page (except home page) will result in error :"This XML file does not appear to have any style information associated with it"
- Editing both Answers and Questions also result in the error above, but the file is edited
- Google signed in results in the following error: Wrong recipient, payload audience != requiredAudience
    - Switch the token to localhost one, so clicking Google Sign in will result in Error: redirect_uri_mismatch



# Addtional Features:
None
