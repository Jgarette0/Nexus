import React, { useEffect, useState } from "react";
import classes from "./ClassUI.module.scss";
import {
  manageAnnouncement,
  getClass,
} from "../../../utils/store/reducers/class";
import { useDispatch, useSelector } from "react-redux";
import EditorWrapper from "./EditorWrapper";
import Announcement from "./Announcement";
import ScrollToTop from "../svg/ScrollToTop";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import ThreeDots from "../svg/ThreeDots";
import PageLoader from "../progress/PageLoader";
import { validateAnnouncement } from "@/helper/validateAnnouncement";

const ClassUI = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [textEditor, setTextEditor] = useState(false);
  const [content, setContent] = useState("");
  const [isEditAnnouncement, setIsEditAnnouncement] = useState(null);

  const router = useRouter();
  const { classId } = router.query;

  const {
    announcements = [],
    pinnedAnnouncements = [],
    _id,
    name,
    backgroundColor,
    teacher,
    batch,
  } = useSelector((state) => state.class.currentClassDetails);

  const manageAnnouncementHandler = (classId, content) => {
    if (!validateAnnouncement(content)) {
      toast.info("Announcement should contain valid text!");
      toast.clearWaitingQueue();
      return false;
    }

    dispatch(
      manageAnnouncement({
        classId,
        content,
        setIsLoading,
        setTextEditor,
        announcementId: isEditAnnouncement?.id,
        isPinned: isEditAnnouncement?.isPinned,
      })
    );

    setContent("");
    setIsEditAnnouncement(null);
  };

  const editAnnouncementHandler = (text, announcementId, isPinned) => {
    setTextEditor(true);
    setIsEditAnnouncement({ id: announcementId, isPinned });
    setContent(text);

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  useEffect(() => {
    if (_id !== classId) {
      dispatch(getClass({ classId, router }));
    }
  }, [_id, dispatch, classId, router]);

  if (_id !== classId) {
    return <PageLoader />;
  }

  return (
    <div className={classes.class}>
      <div
        className={classes["class__nameBox"]}
        style={{ backgroundColor: backgroundColor }}
      >
        <div className={classes["class__name"]}>{name}</div>
        <div className={classes["class__batch"]}>{batch}</div>
      </div>
      <div className={classes.container}>
        <div className={classes["copy_code_container"]}>
          <div>
            <h3>Class Code</h3>
            <ThreeDots />
          </div>
          <p className={classes["class_code"]}>{_id}</p>
        </div>
        <div className={classes.announcementContainer}>
          <EditorWrapper
            classId={_id}
            textEditor={textEditor}
            setTextEditor={setTextEditor}
            isEditAnnouncement={isEditAnnouncement}
            content={content}
            setContent={setContent}
            manageAnnouncementHandler={manageAnnouncementHandler}
            teacher={teacher}
            isLoading={isLoading}
            backgroundColor={backgroundColor}
          />
          {pinnedAnnouncements?.length !== 0 && (
            <>
              {pinnedAnnouncements.map((announcement) => (
                <Announcement
                  classId={_id}
                  key={announcement._id}
                  teacher={teacher}
                  announcement={announcement}
                  backgroundColor={backgroundColor}
                  editAnnouncementHandler={editAnnouncementHandler}
                />
              ))}
            </>
          )}

          {announcements?.length !== 0 &&
            announcements.map((announcement) => (
              <Announcement
                classId={_id}
                key={announcement._id}
                teacher={teacher}
                announcement={announcement}
                editAnnouncementHandler={editAnnouncementHandler}
              />
            ))}

          {pinnedAnnouncements?.length === 0 && announcements?.length === 0 && (
            <h3 className={classes["no_announcement_found_text"]}>
              No Announcements found!
            </h3>
          )}
        </div>
      </div>
      <ScrollToTop backgroundColor={backgroundColor} />
    </div>
  );
};

export default React.memo(ClassUI);
