
/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Main
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

body {
    background      : #222;
    font-family     : "Lato", Tahoma, Arial, Helvetica, "sans-serif", sans-serif;
}

.timeago {
    cursor          : pointer;
}

/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Containers
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

div.container.padded {
    padding         : 20px 0;
}


/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| OP Area
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

body .admin-stats { display  : none; }

body.admin .admin-stats,
body.moderator .admin-stats {
    display         : inline-block;
}
body.moderator div.copyright .admin-stats {
    background      : #DDD;
    color           : #666;
    padding         : 5px;
    margin          : 0;
    font-size       : 80%;
}

/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Brand
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

a.brand.logo {
    display             : block;
    width               : 215px;
    height              : 32px;
    margin-left         : 5%;
    background-repeat   : no-repeat;
    background-image    : url(@CDNSITE/img/logo/header.logo.png);
    padding             : 0 0 0px 0;
}

/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Notification Dropdowns
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

div.dropdown.coverage {
    position        : fixed;
    background      : rgba(0,0,0,0);
    opacity         : 0;
    z-index         : 99;
    top             : 0;
    left            : 0;
    width           : 100%;
    height          : 100%;
}

ul.dropdown {
    position        : absolute;
    background      : #FFF;
    border          : 1px solid #CCC;
    list-style      : none;
    padding         : 0;
    margin          : 0;
    width           : 30%;
    min-width       : 200px;
    box-shadow      : 4px 6px 12px rgba(0, 0, 0, .175);
    z-index         : 100;
}

ul.sub-dropdown {
    margin          : 0;
    padding         : 0;
}

ul.sub-dropdown li,
    ul.dropdown li {
    list-style      : none;
    margin          : 0;
    vertical-align  : middle;
    position        : relative;
}

ul.sub-dropdown li.header,
    ul.dropdown li.header {
    padding         : 15px 10px;
    border-bottom   : 1px solid #EAEAEA;
    border-left     : 3px solid #DDD;
}

ul.sub-dropdown li.header h5,
    ul.dropdown li.header h5 {
    font-size       : 100%;
    color           : #333;
    font-weight     : 700;
    margin          : 0;
}

ul.sub-dropdown li.header a.mark,
    ul.dropdown li.header a.mark {
    font-size       : 80%;
    display         : inline-block;
    position        : absolute;
    top             : 15px;
    right           : 10px;
    padding         : 0;
    margin          : 0;
    background      : transparent;
    color           : #999;
}

ul.sub-dropdown li.header a.mark:hover,
    ul.dropdown li.header a.mark:hover {
    color           : @COLORONE;
}

ul.dropdown li.footer {
    text-align      : center;
    cursor          : pointer;
    font-size       : 80%;
}

ul.dropdown li.footer a {
    padding         : 10px 10px;
    color           : #999;
    display         : block;
    width           : 100%;
    text-align      : center;
}

ul.dropdown li.footer:hover {
    background      : #EAEAEA;
}

ul.dropdown li.footer:hover a{
    color           : #666;
}

ul.sub-dropdown li.menu-item,
    ul.dropdown li.menu-item,
    ul.dropdown li.notification {
    width           : 100%;
    display         : table;
    padding         : 10px 10px;
    color           : #999;
    border-bottom   : 1px solid #EAEAEA;
    table-layout    : fixed;
}

ul.sub-dropdown li.filler,
    ul.dropdown li.filler {
    width           : 100%;
    display         : none;
    padding         : 15px 10px 15px 10px;
    text-align      : center;
    border-bottom   : 1px solid #EAEAEA;
    color           : #999;
}

ul.sub-dropdown.nothing li.filler,
    ul.dropdown.nothing li.filler {
    display         : block;
}

ul.sub-dropdown li.menu-item span,
    ul.dropdown li.menu-item span,
    ul.dropdown li.notification span {
    display         : table-cell;
    text-align      : left;
    vertical-align  : middle;
    padding         : 0 0 0 10px;
    font-size       : 90%;
}

ul.sub-dropdown li.notification span.icon,
    ul.dropdown li.notification span.icon {
    display          : table-cell;
    width            : 50px;
    height           : 50px;
    text-align       : center;
    padding          : 0;
    background-color : rgba(200,200,200,0.5);
    background-size  : cover;
    background-repeat : no-repeat;
}

ul.sub-dropdown li.menu-item span.icon i.fa,
    ul.dropdown li.menu-item span.icon i.fa,
    ul.dropdown li.notification span.icon i.fa {
    color           : #666;
    font-size       : 120%;
    background      : rgba(255,255,255,0.5);
    padding         : 4px;
    border-radius   : 3px;
}

ul.dropdown li.notification small.timeago {
    display         : block;
    color           : #999;
}

ul.sub-dropdown li.notification.unread span
ul.dropdown li.notification.unread span {
    color           : #666;
}

ul.dropdown li.notification span b {
    color           : #333;
    font-weight     : normal;
}

ul.dropdown li.notification.unread {
    background      : rgba(200,200,200,0.2);
}

ul.dropdown li.notification.unread span,
    ul.dropdown li.notification.unread span b {
    font-weight     : bold;
}

ul.sub-dropdown li.menu-item span.icon,
    ul.dropdown li.menu-item span.icon {
    display          : table-cell;
    text-align       : center;
    vertical-align   : middle;
    width            : 40px;
}

ul.sub-dropdown li.menu-item span.icon i.fa,
    ul.dropdown li.menu-item span.icon i.fa {
    display          : inline-block;
    font-size        : 140%;
    padding          : 5px 5px 3px 5px;
    width            : auto;
    background-color : #FFF;
}

ul.sub-dropdown li.menu-item,
    ul.dropdown li.menu-item {
    border-left      : 3px solid transparent;
}

ul.sub-dropdown li.menu-item.selected,
    ul.dropdown li.menu-item.selected {
    background-color : @MODALONE-RGBA-8; /* Modal Blue */
    color            : #FFF;
    border-left      : 3px solid @MODALONE; /* Modal Blue */
}

ul.sub-dropdown li.menu-item:hover,
    ul.dropdown li.menu-item:hover {
    background-color : @MODALONE-RGBA-4; /* Modal Blue */
    color            : #333;
    border-left      : 3px solid @MODALONE-RGBA-9; /* Modal Blue */
}

ul.sub-dropdown li.menu-item:hover span.icon,
    ul.dropdown li.menu-item:hover span.icon {
    border-radius    : 5px;
}

ul.sub-dropdown li.menu-item:hover span.icon i.fa,
    ul.dropdown li.menu-item:hover span.icon i.fa {
    color           : @MODALONE-RGBA-9; /* Modal Blue */
}

ul.sub-dropdown li.divider,
    ul.dropdown li.divider {
    padding         : 10px 10px;
    border-left     : 3px solid #EAEAEA;
    border-bottom   : 1px solid #EAEAEA;
    background      : rgba(200,200,200,0.1);
}

ul.sub-dropdown li.divider h5,
    ul.dropdown li.divider h5 {
    font-weight     : 700;
    color           : #666;
    font-size       : 90%;
    padding         : 0;
    margin          : 0;
}

/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Dropdown Members
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

div.dropdown.members {
    position        : absolute;
    background      : #FFF;
    border          : 1px solid #CCC;
    list-style      : none;
    padding         : 0;
    margin          : 0;
    width           : 60%;
    min-width       : 320px;
    box-shadow      : 4px 6px 12px rgba(0, 0, 0, .175);
    z-index         : 100;
}

div.dropdown.members div.submenu {
    display         : table;
    width           : 100%;
}

div.dropdown.members div.submenu ul.sub-dropdown li.header {
    border-left     : 0;
}

div.dropdown.members div.dd-left {
    vertical-align  : top;
    display         : table-cell;
    width           : 60%;
}

div.dropdown.members div.dd-right {
    vertical-align  : top;
    display         : table-cell;
    width           : 40%;
    background      : rgba(50,50,50,0.6);
}

div.dropdown.members div.dd-left ul.sub-dropdown {
    border-left     : 1px solid #CCC;
}

div.dropdown.members div.dd-right ul.sub-dropdown {
    border          : 0;
}

div.dropdown.members div.dd-right ul.sub-dropdown li.menu-item {
    border-left     : 3px solid transparent;
    padding         : 6px 8px;
}

div.dropdown.members div ul.sub-dropdown {
    background      : #FFF;
}

div.dropdown.members span.footer {
    display         : block;
    background      : #FFF;
    padding         : 0;
    background      : rgba(200,200,200,0.2);
}

div.dropdown.members span.footer a {
    font-size       : 90%;
    display         : block;
    text-align      : center;
    width           : 100%;
    color           : #666;
    height          : 100%;
    padding         : 10px 20px;
}

div.dropdown.members span.footer:hover {
    cursor           : pointer;
    background-color : @MODALONE-RGBA-4; /* Modal Blue */
}

div.dropdown.members span.footer:hover a{
    color            : #000;
}

div.dropdown.members div.dd-right ul.sub-dropdown li.divider {
    background      : rgba(200,200,200,0.2);
    color           : #FFF;
    border-left     : 0;
    padding         : 16px 10px;
    border-bottom   : 1px solid #CCC;
}

ul.sub-dropdown li.footer {
    background      : rgba(200,200,200,0.2);
    padding         : 12px 10px;
    text-align      : center;
    font-size       : 80%;
}

/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Member Dropdown User record
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

div.dropdown.members div.dd-left ul.sub-dropdown li.header.profile {
    display         : table;
    width           : 100%;
}

div.dropdown.members div.dd-left ul.sub-dropdown li.header.profile h5 {
    display         : table-cell;
    width           : 70%;
}

div.dropdown.members div.dd-left ul.sub-dropdown li.header.profile a {
    display         : table-cell;
    padding         : 4px 10px;
    white-space     : nowrap;
}

div.dropdown.members div.dd-left ul.sub-dropdown li.header.profile span.myUsername {
    padding-left    : 5px;
    color           : #999;
}

div.dropdown.members div.dd-left ul.sub-dropdown li.header.profile a:hover {
    background      : @MODALONE-RGBA-4; /* Modal Blue */
    border-radius   : 5px;
}

div.dropdown.members div.dd-left ul.sub-dropdown li.header.profile a:hover span.myUsername {
    color           : @COLORONE;
}

div.dropdown.members div.dd-left ul.sub-dropdown img.myProfile {
    border-radius   : 50%;
    width           : 30px;
    height          : 30px;
}


/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Nav / User
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

header nav.user {
    display         : table;
    width           : 100%;
    background      : @COLORONE;
    padding         : 0 5%;
    margin          : 0 0 0 0;
    table-layout    : fixed;
    z-index         : 5;
}

header nav.user i {
    font-style          : normal;
}

header nav.user li {
    display         : table-cell;
    margin          : 0;
    vertical-align  : middle;
    border-left     : 1px dotted rgba(255,255,255,0.3);
    border-top      : 3px solid rgba(255,255,255,0.1);
}

header nav.user li.brand {
    border-left     : 0;
    padding         : 10px 0;
    width           : 40%;
}

header nav.user li.icon.selected {
    border-top    : 3px solid #72c02c;
}

header nav.user li.icon.selected a {
    color           : #FFF;
}

header nav.user li.icon {
    border-top      : 3px solid rgba(255,255,255,0.5);
    font-size       : 110%;
    max-width       : 100px;
    width           : 100px;
}

header nav.user li.username {
    font-size       : 85%;
    width           : 20%;
    border-top      : 3px solid rgba(255,255,255,0.4);
    border-right    : 1px dotted rgba(255,255,255,0.3);
    background      : rgba(255,255,255,0.03);
}

header nav.user li.username a {
    padding         : 0 15px;
}

header nav.user li.username i.fa {
    padding         : 0 5px;
}

header nav.user li a {
    color           : #FFF;
    text-decoration : none;
    text-align      : center;
    display         : block;
    width           : 100%;
    height          : 100%;
    padding         : 15px 0;
    position        : relative;
    z-index         : 1;
}

header nav.user li span {
    display             : inline-block;
    position            : absolute;
    top                 : 0;
    right               : 5%;
    font-size           : 70%;
    font-weight         : 700;
    background          : rgba(255,0,0,0.7);
    border-radius       : 0 0 5px 5px;
    color               : #FFF;
    padding             : 3px 5px;
    z-index             : 2;
}

header nav.user li.public.join {
    background      : rgba(255,0,0,0.6);
}

body.mobile-nav-open header nav.user li.public.join {
    background      : transparent;
}

body.mobile-nav-open header li.icon.menu {
    background      : rgba(0,0,0,0.4);
}


/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Nav / Area
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

header nav.area {
    background          : #FFF;
    display             : table;
    padding             : 0 5%;
    table-layout        : fixed;
    width               : 100%;
    margin-bottom       : 0;
    z-index             : 5;
}

header nav.area li {
    list-style          : none;
    display             : table-cell;
    padding             : 0;
}

header nav.area li a {
    font-size           : 1em;
    font-weight         : 700;
    color               : #516e88;
    text-decoration     : none;
    display             : block;
    text-transform      : uppercase;
    width               : 100%;
    height              : 100%;
    padding             : 12px 0 8px;
    text-align          : center;
    border-left         : 1px dotted rgba(200,200,200,0.7);
}

header nav.area li:last-child a {
    border-right         : 1px dotted rgba(200,200,200,0.7);
}

header nav.area li a span{
    display             : inline-block;
    border-bottom       : 4px solid rgba(200,200,200,0.2);
    padding             : 0 2px 5px;
    margin              : 0 0 2px 0;
}

header nav.area li a:hover span{
    border-bottom       : 4px solid #7ab558;
}

body nav.area li.selected a span {
    border-bottom       : 4px solid #7ab558;
}

/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Main
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

main {
    background          : #EAEAEA;
    position            : relative;
}

/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Footer Global
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

footer {
}

footer nav.table,
    footer nav,
    footer ul.runner {
    display         : table;
    table-layout    : fixed;
    width           : 100%;
    margin          : 0;
    padding         : 0 2%;
}

footer nav section,
    footer ul.runner li {
    display         : table-cell;
    vertical-align  : top;
    padding         : 20px 0 0 0;
}

footer span.headline {
    display         : block;
    margin          : 0px 0 15px 0;
    border-bottom   : 1px dotted #e4e9f0;
    text-align      : left;
}

footer span.headline h5 {
    color           : #eee;
    font-weight     : 400;
    font-size       : 110%;
    margin          : 0 0 -2px 0;
    padding         : 0 5px 5px 0;
    display         : inline-block;
    border-bottom   : 3px solid @COLORTWO;
}

/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Footer Nav
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

footer nav {
    background      : rgba(51,51,51,1);
    padding         : 30px 30px;
}

footer nav section  {
    padding         : 30px 10px 30px 10px
}

footer nav li a {
    display         : block;
    width           : 100%;
    height          : 100%;
    text-align      : center;
}

/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Footer Company
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

footer nav section.company a.brand.logo {
    margin          : 20px 0 20px;
    width           : 232px;
    height          : 32px;
}

footer nav section.company {
    text-align      : center;
    padding         : 20px 0 0;
    width           : 30%;
}

footer nav section.blog {

}

footer nav section.company ul.spread {
    display         : table;
    margin          : 10px 0 0 0;
    padding         : 0;
}

footer nav section.company ul.spread li {
    width           : 50%;
    display         : table-cell;
    list-style      : none;
    vertical-align  : middle;
    padding         : 0 10px;
}

footer nav section.company ul.spread li.address {
    border-right     : 2px dotted rgba(255,255,255,0.1);
}


footer nav section.company address {
    margin          : 0;
    padding         : 0 10px 0 0px;
}

footer nav section.company p {
    color           : rgba(200,200,200,1);
    text-align      : left;
    font-size       : 90%;
    padding         : 1px 0;
    margin          : 0;
}

footer nav section.company a.button {
    display         : inline-block;
    padding         : 5px 5px;
    margin          : 0;
    background      : rgba(200,200,200,0.3);
    color           : #CCC;
    border-radius   : 5px;
    font-size       : 70%;
    font-weight     : 700;
    text-transform  : uppercase;
    letter-spacing  : 1px;
    text-align      : center;
    border          : 3px solid rgba(255,255,255,0.1);
}

footer nav section.links {
    padding         : 30px 20px;
    width           : 25%;
}

footer nav section.links.company {

}

footer nav section.links ul {
    display         : block;
    width           : 100%;
    padding         : 0;
    margin          : 0;
}

footer nav section.links ul li {
    border-bottom   : 1px dotted #666;
    display         : block;
    padding         : 0;
    margin          : 0;
    font-size       : 80%;
    position        : relative;
}

footer nav section.links ul li:after {
    position        : absolute;
    right           : 0;
    top             : 25%;
    color           : #999;
    display         : inline-block;
    font-family     : "FontAwesome";
    content         : "\f105";
}

footer nav section.links ul li:last-child {
    border-bottom   : 0px;
}

footer nav section.links ul li a {
    color           : #FFF;
    text-align      : left;
    padding         : 8px 0;
    text-transform  : uppercase;
}

footer nav section.links ul li a:hover {
    color           : @COLORTWO;
}

/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Footer Blogs
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

footer nav section.blog li {
    display         : table;
    table-layout    : fixed;
    list-style      : none;
    width           : 100%;
    vertical-align  : top;
    padding         : 5px 0 30px;
}

footer nav section.blog li a {
    display         : table-cell;
    color           : #FFF;
    border          : 0;
    text-align      : left;
    text-transform  : uppercase;
    font-size       : 75%;
    margin          : 0;
    padding         : 0;
    vertical-align  : middle;
}

footer nav section.blog li a small {
    display         : block;
    color           : #CCC;
}

footer nav section.blog li a.img {
    width           : 50px;
    height          : 40px;
}

footer nav section.blog li a.post {

}

footer nav section.blog li a.img img {
    display         : block;
    width           : 40px;
    height          : 40px;
    margin          : 0 10px 0 0;
}

/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Footer Runner
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

footer ul.runner {
    background      : rgba(34,34,34,1);
    color           : #FFF;
}

footer ul.runner li {
    vertical-align  : middle;
}

footer ul.runner li.copyright {
    color           : rgba(255,255,255,0.5);
    width           : 60%;
    font-size       : 80%;
    padding         : 30px 0;
}

footer ul.runner li.copyright p {
    margin          : 0 0 0 20px;
    padding         : 0;
    display         : block;
    width           : 100%;
}

footer ul.runner li.social {
    cursor          : pointer;
    border-left     : 1px dotted rgba(255,255,255,0.3);
}

footer ul.runner li.social:last-child {
    border-right    : 1px dotted rgba(255,255,255,0.3);
}

footer ul.runner li.social:first-child {
    border-left     : 0;
}

footer ul.runner li.social a {
    display         : block;
    color           : rgba(255,255,255,0.4);
    text-align      : center;
    margin          : 0;
    padding         : 10px;
}

footer ul.runner li.social:hover a {
    color           : #FFF;
}


footer ul.runner li.social.facebook:hover       { background :  #3b5998; }
footer ul.runner li.social.twitter:hover        { background :  #1da1f2; }
footer ul.runner li.social.tumblr:hover         { background :  #35465d; }
footer ul.runner li.social.google-plus:hover    { background :  #db4437; }
footer ul.runner li.social.vimeo:hover          { background :  #1ab7ea; }
footer ul.runner li.social.youtube:hover        { background :  #ff0000; }
footer ul.runner li.social.instagram:hover      { background :  #c32aa3; }


footer ul.runner li.social {
    min-width       : 32px;
    max-width       : 50px;
    padding         : 0 0 0 0;
}


/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Account/Public/Guest
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/


body.paid.certified.members.picture div.dropdown.members {
    width           : 30%;
    min-width       : 240px;
}

body.picture div.dropdown.members div.dd-right ul.sub-dropdown li.menu-item.ispicture,
    body.picture .ispicture {
    display :  none;
}

body.paid div.dropdown.members div.dd-right ul.sub-dropdown li.menu-item.ispaid,
    body.paid .ispaid {
    display :  none;
}

body.certified div.dropdown.members div.dd-right ul.sub-dropdown li.menu-item.iscertified,
    body.certified .iscertified {
    display :  none;
}

div.wrapper .public, div.wrapper .members {
    display         : none !important;
}

body.public div.wrapper .public.inline        { display : inline !important; }
body.public div.wrapper .public.i-block       { display : inline-block !important; }
body.public div.wrapper .public.block         { display : block !important; }
body.public div.wrapper .public.table         { display : table !important; }
body.public div.wrapper .public.cell          { display : table-cell !important; }

body.members div.wrapper .members.inline    { display : inline !important; }
body.members div.wrapper .members.i-block   { display : inline-block !important; }
body.members div.wrapper .members.block     { display : block !important; }
body.members div.wrapper .members.table     { display : table !important; }
body.members div.wrapper .members.cell      { display : table-cell !important; }


div.wrapper .mobile.inline        { display : none !important; }
div.wrapper .mobile.i-block       { display : none !important; }
div.wrapper .mobile.block         { display : none !important; }
div.wrapper .mobile.table         { display : none !important; }
div.wrapper .mobile.cell          { display : none !important; }

@media (max-width: 767px) {
    body div.wrapper .desktop.inline,
        body div.wrapper .desktop-i-block,
        body div.wrapper .desktop.block,
        body div.wrapper .desktop.table,
        body div.wrapper .desktop.cell,

        body div.wrapper .desktop.members.inline,
        body div.wrapper .desktop.members-i-block,
        body div.wrapper .desktop.members.block,
        body div.wrapper .desktop.members.table,
        body div.wrapper .desktop.members.cell,

        body div.wrapper .desktop.public.inline,
        body div.wrapper .desktop.public-i-block,
        body div.wrapper .desktop.public.block,
        body div.wrapper .desktop.public.table,
        body div.wrapper .desktop.public.cell,

        body.public div.wrapper .desktop.members.inline,
        body.public div.wrapper .desktop.members-i-block,
        body.public div.wrapper .desktop.members.block,
        body.public div.wrapper .desktop.members.table,
        body.public div.wrapper .desktop.members.cell,

        body.public div.wrapper .desktop.public.inline,
        body.public div.wrapper .desktop.public-i-block,
        body.public div.wrapper .desktop.public.block,
        body.public div.wrapper .desktop.public.table,
        body.public div.wrapper .desktop.public.cell,

        body.members div.wrapper .desktop.members.inline,
        body.members div.wrapper .desktop.members-i-block,
        body.members div.wrapper .desktop.members.block,
        body.members div.wrapper .desktop.members.table,
        body.members div.wrapper .desktop.members.cell,

        body.members div.wrapper .desktop.public.inline,
        body.members div.wrapper .desktop.public-i-block,
        body.members div.wrapper .desktop.public.block,
        body.members div.wrapper .desktop.public.table,
        body.members div.wrapper .desktop.public.cell                { display : none !important; }

    div.wrapper .mobile.inline        { display : inline !important; }
    div.wrapper .mobile.i-block       { display : inline-block !important; }
    div.wrapper .mobile.block         { display : block !important; }
    div.wrapper .mobile.table         { display : table !important; }
    div.wrapper .mobile.cell          { display : table-cell !important; }
}


@media (max-width: 1025px) {

    header nav.user,
        header nav.area {
        padding         : 0 0 ;
    }


    a.brand.logo {
        width           : 32px;
        margin          : 0 auto 0 auto;
        border-right    : 15px;
    }

    header nav.user li.brand {
        border-left     : 0;
        padding         : 10px 0;
        width           : 20%;
    }

    header nav.user li.icon {
        max-width       : auto;
        width           : auto;
    }

    footer nav section.company ul.spread li.address {
        border-right     : 0px;
    }

    footer nav section.company ul.spread li.contact-us {
        display          : none;
    }


}