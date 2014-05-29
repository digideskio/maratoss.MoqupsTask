$(document).ready(function () {
    var user = new User();
    user.setFirstname("aaa");
    user.setLastname("bbb");

    ko.applyBindings(user);
});
