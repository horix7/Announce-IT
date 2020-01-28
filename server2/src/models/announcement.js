
import users from './userdb';
import announcements from './announcementdb';
export default class Announcement {
  static createAnnouncement(announcement, token) {
    const user = users.find((us) => us.id === parseInt(token.id));
    if (user) {
      if (token.isAdmin) {
        return 'admin';
      }
      const announcement1 = {
        id: (announcements.length)+1,
        owner: token.id,
        status: announcement.status || 'pending',
        text: announcement.text,
        startDate: announcement.startDate,
        endDate: announcement.endDate,
      };
      announcements.push(announcement1);
      return announcement1;
    }

    return 'not a user';
  }

  static updateAnnouncement(announcement, id, token) {
    const checker = announcements.find((announce) => announce.id === parseInt(id, 10));
    const index = announcements.indexOf(checker);
    const user = users.find((us) => us.id === parseInt(token.id, 10));
    if (user) {
      if (checker) {
        if (token.isAdmin) {
          return 'admin';
        }
        if (parseInt(token.id,10) === checker.owner) {
          announcements[index].id = checker.id;
          announcements[index].owner = checker.owner;
          announcements[index].status = checker.status;
          announcements[index].text = announcement.text || checker.text;
          announcements[index].startDate = announcement.startDate || checker.startDate;
          announcements[index].endDate = announcement.endDate || checker.endDate;

          return announcements[index];
        }

        return 'not the owner';
      }

      return 'Not exists';
    }

    return 'not a user';
  }

  static updateStatus(announcement, id, token) {
    const checker = announcements.find((announce) => announce.id === parseInt(id,10));
    const index = announcements.indexOf(checker);
    const user = users.find((us) => us.id === parseInt(token.id,10));
    if (user) {
      if (checker) {
        if (token.isAdmin) {
          announcements[index].id = checker.id;
          announcements[index].owner = checker.owner;
          announcements[index].status = announcement.status || checker.status;
          announcements[index].text = checker.text;
          announcements[index].startDate = checker.startDate;
          announcements[index].endDate = checker.endDate;

          return announcements[index];
        }

        return 'not admin';
      }

      return 'Not exists';
    }
    return 'not a user';
  }

  static deleteAnnouncement(id, token) {
    const checker = announcements.find((announce) => announce.id === parseInt(id,10));
    const index = announcements.indexOf(checker);
    const user = users.find((us) => us.id === parseInt(token.id,10));
    if (user) {
      if (checker) {
        if (token.isAdmin) {
          announcements.splice(index, 1);
          return checker;
        }

        return 'not admin';
      }

      return 'Not exists';
    }

    return 'not a user';
  }

  static viewAnnouncements(token) {
    const user = users.find((us) => us.id === parseInt(token.id,10));
    if (user) {
      if (announcements) {
        return announcements;
      }
      return 'no announcements';
    }
    return 'not a user';
  }

  static announcementDetails(id, token) {
    const user = users.find((us) => us.id === parseInt(token.id,10));
    if (user) {
      const announcement = announcements.find((announce) => announce.id === parseInt(id,10));
      if (announcement) {
        return announcement;
      }
      return 'not found';
    }
    return 'not a user';
  }

  static myAnnouncements(token) {
    const user = users.find((us) => us.id === parseInt(token.id,10));
    const myAnnouncement = announcements.find((announce) => announce.owner === parseInt(user.id,10));
    if (user) {
      if (myAnnouncement) {
        return myAnnouncement;
      }

      return 'not found';
    }
    return 'not a user';
  }
}
