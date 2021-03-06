'use strict';

/**
 * @ngdoc overview
 * @name linshare.userProfile
 * @description
 *
 * A module in which we have one service
 *
 */
angular.module('linshare.userProfile', [])
/**
 * @ngdoc service
 * @name linshare.userProfile.service:LinshareUserService
 * @description
 *
 * This service will help to store in a object the user information
 */
  .service('LinshareUserService', function () {

    function User() {
      this.firstName = null;
      this.lastName = null;
      this.mail = null;
      this.locale = null;
      this.role = null;
      this.accountType = null;
      this.preferences = {};
    }

    angular.extend(User.prototype, {

      getUser: function() {
        return this;
      },

      setUser: function(user) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.mail = user.mail;
        this.locale = user.locale;
        this.role = user.role;
        this.accountType = user.accountType;
      },

      hasRightAccountType: function(accountType) {
        return this.accountType === accountType;
      },

      hasRightRole: function(role) {
        return this.role === role;
      }
    });

    return User;
  })


  .factory('LinshareGuestService', function(Restangular) {
    var baseGuestRest = Restangular.all('guests');
    return {
      find: function(uuid) {
        return baseGuestRest.one(uuid).get();
      },
      getList: function() {
        return baseGuestRest.getList();
      },
      addGuest: function(guestDto) {
        return baseGuestRest.post(guestDto);
      },
      delete: function(guestDto) {
        return baseGuestRest.remove(guestDto);
      },
      update: function(uuid) {
        return baseGuestRest.put(uuid);
      },
      assignGroup: function() {
        return null;
      }
    };
  });
