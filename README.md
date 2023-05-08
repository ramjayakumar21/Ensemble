
<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url] -->
[![LinkedIn][linkedin-shield]][linkedin-url]
![License][License]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ramjayakumar21/Ensemble">
    <!-- <img src="images/logo.png" alt="Logo" width="80" height="80"> -->
  </a>

<h3 align="center">Ensemble</h3>

  <p align="center">
    Review albums/songs and share with your friends!
    <!-- <br />
    <a href="https://github.com/ramjayakumar21/repo_name"><strong>Explore the docs »</strong></a>
    <br /> -->
    <br />
    <a href="https://github.com/ramjayakumar21/Ensemble">View Demo</a>
    ·
    <a href="https://github.com/ramjayakumar21/Ensemble/issues">Report Bug</a>
    ·
    <a href="https://github.com/ramjayakumar21/Ensemble/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About Ensemble</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Ensemble Screen Shot][product-screenshot]](https://example.com)

As someone who listens to a ton of music, I've always wanted a platform to share my opinions with my friends in an easy way. Thus, I decided to started building this app! It allows users to create reviews for albums, choose their top songs and see listening info based on their Spotify Account. I used Typescript in React, Node, Express, and MongoDB to create this app. Please let me know what you think!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Node][Node.com]][JQuery-url]
* ![Express][Express.js]
* ![MUI][MUI-logo]
* ![React Router][React-Router-Logo]
* ![MongoDB][MongoDB-Logo]
* ![MongoDB][Spotify-Logo]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is how you get Ensemble running locally.
To get a local copy up and running follow these steps:

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```
* MongoDB - sign up for account, and provide connection link in .env file under `DATABASE_URL`



### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ramjayakumar21/Ensemble.git
   ```

2. Run the build script (installs NPM packages)
    ```sh
   source build.sh
   ```

3. Run the start script
   ```sh
   source start.sh
   ```

The frontend should run on your localhost on port 5173.


<!-- USAGE EXAMPLES -->
## Usage

Users can sign up and sign into accounts via the accounts page, which uses **Firebase** to store user data. Once they have linked their Spotify, they can then create userreviews.



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] ~~Support creating review objects and database storage~~
- [x] ~~Support user sign up and linking to Spotify API~~
- [x] Support comments and public accounts
    - [x] Add attribute to show if account/review is public/private

Future plans include supporting a user search bar, listen-along section, group reviews, and timestamp highlighting.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing


If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## Credits

This README was built from a template taken from [here.](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Ram Jayakumar - [Linkedin](https://www.linkedin.com/in/ram-jayakumar-2a096420b/) - ramjayakumar21@gmail.com

Project Link: [https://github.com/ramjayakumar21/Ensemble](https://github.com/ramjayakumar21/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/ramjayakumar21/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/ramjayakumar21/Ensemble/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ramjayakumar21/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/ramjayakumar21/Ensemble/network/members
[stars-shield]: https://img.shields.io/github/stars/ramjayakumar21/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/ramjayakumar21/Ensemble/stargazers
[issues-shield]: https://img.shields.io/github/issues/ramjayakumar21/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/ramjayakumar21/repo_name/issues
[license-shield]: https://img.shields.io/github/license/ramjayakumar21/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/ramjayakumar21/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/ram-jayakumar-2a096420b/
[product-screenshot]: ./frontend/public/reviewspage.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Node.com]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node.js]: https://nodejs.org/en
[Express.js]:https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[MUI-logo]: https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white
[React-Router-logo]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[MongoDB-logo]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Spotify-logo]: https://img.shields.io/badge/Spotify-API-1ED760?&style=for-the-badge&logo=spotify&logoColor=white
[License]: https://img.shields.io/badge/License-MIT-blue.svg