'use strict';

angular.module('linshareUiUserApp')
  .factory('workGroupRestService', function(Restangular, $log) {

    return {

      //WORKGROUP
      getAll: function() {
        $log.info('WorkGroupRestService - Get All WorkGroups');
        return Restangular.all('work_groups').getList();
      },
      get: function(WorkGroupUuid) {
        $log.info('WorkGroupRestService - Get WorkGroup Information');
        return Restangular.one('work_groups', WorkGroupUuid).get();
      },
      create: function(WorkGroupDto) {
        $log.info('WorkGroupRestService - Create WorkGroup');
        return Restangular.all('work_groups').post(WorkGroupDto);
      },
      update: function(WorkGroupDto) {
        $log.info('WorkGroupRestService - Update WorkGroup');
        return Restangular.one('work_groups', WorkGroupDto.uuid).customPUT(WorkGroupDto);
      },
      delete: function(WorkGroupUuid) {
        $log.info('WorkGroupRestService - Delete WorkGroups');
        return Restangular.one('work_groups', WorkGroupUuid).remove();
      }
    };
  })

  // WORKGROUPS ENTRIES REST SERVICE- FILES
  .factory('workGroupEntriesRestService', function(Restangular, $log) {
    var _workGroupUuid = null;

    return {
      getAll: function() {
        $log.info('workGroupEntriesRestService -  Get all WorkGroupEntries of the WorkGroup ', _workGroupUuid);
        return Restangular.one('work_groups', _workGroupUuid).getList('entries');
      },
      get: function(entryUuid) {
        $log.info('workGroupEntriesRestService -  Get a WorkGroupEntry ' + entryUuid + ' of the WorkGroup ', _workGroupUuid);
        return Restangular.one('work_groups', _workGroupUuid).one('entries', entryUuid).get();
      },
      download: function(entryUuid) {
        $log.info('workGroupEntriesRestService - Download a WorkGroupEntry ' + entryUuid + ' of the WorkGroup ', _workGroupUuid);
        return Restangular.one('work_groups', _workGroupUuid).one('entries', entryUuid).customGET('download');
      },
      copy: function(entryUuid) {
        $log.info('workGroupEntriesRestService - Copy a entry ' + entryUuid + ' of the workgroup', _workGroupUuid);
        return Restangular.one('work_groups', _workGroupUuid).one('entries/copy', entryUuid).post();
      },
      update: function(entryUuid, workGroupEntry) {
        $log.info('workGroupEntriesRestService - update a entry ' + entryUuid + ' of the workgroup', _workGroupUuid);
        return Restangular.one('work_groups', _workGroupUuid).one('entries', entryUuid).customPUT(workGroupEntry);
      },
      getThumbnail: function(entryUuid) {
        return Restangular.one('work_groups', _workGroupUuid).one('entries', entryUuid).customGET('thumbnail', {base64: true});
      },
      delete: function(entryUuid) {
        $log.info('workGroupEntriesRestService -  Delete a WorkGroupEntry ' + entryUuid + ' of the WorkGroup ', _workGroupUuid);
        return Restangular.one('work_groups', _workGroupUuid).one('entries', entryUuid).remove();
      },
      setWorkgroupUuid: function(uuid) {
        _workGroupUuid = uuid;
      }
    };
  })

  // WORKGROUPS MEMBERS REST SERVICE
  .factory('workGroupMembersRestService', function(Restangular, $log) {

    return {
      getAll: function(workGroupUuid) {
        $log.info('WorkGroupRestService -  Get a WorkGroup Member ' + workGroupUuid);
        return Restangular.one('work_groups', workGroupUuid).all('members').getList();
      },
      create: function(workGroupUuid, member) {
        $log.info('WorkGroupRestService -  createMember');
        return Restangular.one('work_groups', workGroupUuid).all('members').post(member);
      },
      get: function(workGroupUuid, memberUuid) {
        $log.info('WorkGroupRestService -  getMember');
        return Restangular.one('work_groups', workGroupUuid).one('members', memberUuid).get();
      },
      update: function(workGroupUuid, member) {
        $log.info('WorkGroupRestService -  updateMember');
        return Restangular.one('work_groups', workGroupUuid).one('members', member.uuid).customPUT(member);
      },
      delete: function(workGroupUuid, memberUuid) {
        $log.info('WorkGroupRestService -  deleteMember');
        return Restangular.one('work_groups', workGroupUuid).one('members', memberUuid).remove();
      }
    };
  })

  // WORKGROUPS FOLDERS REST SERVICE
  .factory('workGroupFoldersRestService', function(Restangular, $log) {
    var _workGroupUuid = null;

    return {
      getAll: function() {
        $log.info('WorkGroupRestService - Get a WorkGroup Folder ' + _workGroupUuid);
        return Restangular.one('work_groups', _workGroupUuid).getList('folders');
      },
      create: function(folder) {
        $log.info('WorkGroupRestService - createFolder ' + _workGroupUuid);
        return Restangular.one('work_groups', _workGroupUuid).all('folders').post(folder);
      },
      get: function(folderUuid) {
        $log.info('WorkGroupRestService - getFolder');
        return Restangular.one('work_groups', _workGroupUuid).one('folders', folderUuid).get();
      },
      getParent: function(folderUuid) {
        $log.info('WorkGroupRestService - getFolder');
        return Restangular.one('work_groups', _workGroupUuid).getList('folders', {parent: folderUuid});
      },
      update: function(folder) {
        $log.info('WorkGroupRestService - updateFolder');
        return Restangular.one('work_groups', _workGroupUuid).one('folders').customPUT(folder);
      },
      delete: function(folderUuid) {
        $log.info('WorkGroupRestService - deleteFolder');
        return Restangular.one('work_groups', _workGroupUuid).one('folders', folderUuid).remove();
      },
      setWorkgroupUuid: function(uuid) {
        _workGroupUuid = uuid;
      }
    };
  });
