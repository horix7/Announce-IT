
import users from './userdb';
import announcements from './announcementdb';

export default class Announcement {
  static createAnnouncement(announcement, token) {
    const checker = announcements.find((announce) => announce.id === announcement.id);
    const user = users.find((us) => us.id === token.id);
    if (user) {
      if (checker) {
        return 'Announcement exists';
      }
      if (token.is_admin) {
        return 'admin';
      }
      const announcement1 = {
        id: announcement.id,
        owner: token.id,
        status: announcement.status || 'pending',
        text: announcement.text,
        start_date: announcement.start_date,
        end_date: announcement.end_date,
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
        if (token.is_admin) {
          return 'admin';
        }
        if (token.id === checker.owner) {
          announcements[index].id = checker.id;
          announcements[index].owner = checker.owner;
          announcements[index].status = checker.status;
          announcements[index].text = announcement.text || checker.text;
          announcements[index].start_date = announcement.start_date || checker.start_date;
          announcements[index].end_date = announcement.end_date || checker.end_date;

          return announcements[index];
        }

        return 'not the owner';
      }

      return 'Not exists';
    }

    return 'not a user';
  }

  static updateStatus(announcement, id, token) {
    const checker = announcements.find((announce) => announce.id === parseInt(id));
    const index = announcements.indexOf(checker);
    const user = users.find((us) => us.id === parseInt(token.id));
    if (user) {
      if (checker) {
        if (token.is_admin) {
          announcements[index].id = checker.id;
          announcements[index].owner = checker.owner;
          announcements[index].status = announcement.status || checker.status;
          announcements[index].text = checker.text;
          announcements[index].start_date = checker.start_date;
          announcements[index].end_date = checker.end_date;

          return announcements[index];
        }

        return 'not admin';
      }

      return 'Not exists';
    }
    return 'not a user';
  }

  static deleteAnnouncement(id, token) {
    const checker = announcements.find((announce) => announce.id === parseInt(id));
    const index = announcements.indexOf(checker);
    const user = users.find((us) => us.id === parseInt(token.id));
    if (user) {
      if (checker) {
        if (token.is_admin) {
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
    const user = users.find((us) => us.id === parseInt(token.id));
    if (user) {
      if (announcements) {
        return announcements;
      }
      return 'no announcements';
    }
    return 'not a user';
  }

  static announcementDetails(id, token) {
    const user = users.find((us) => us.id === parseInt(token.id));
    if (user) {
      const announcement = announcements.find((announce) => announce.id === parseInt(id));
      if (announcement) {
        return announcement;
      }
      return 'not found';
    }
    return 'not a user';
  }

  static myAnnouncements(token) {
    const user = users.find((us) => us.id === parseInt(token.id));
    const myAnnouncement = announcements.find((announce) => announce.owner === parseInt(user.id));
    if (user) {
      if (myAnnouncement) {
        return myAnnouncement;
      }

      return 'not found';
    }
    return 'not a user';
  }
}
