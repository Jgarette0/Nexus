import React from "react";
import classes from "./ClassCard.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";

const ClassCard = ({ classDetails }) => {
  const router = useRouter();
  const { _id, name: className, teacher, backgroundColor } = classDetails;

  return (
    <div
      className={classes.classCard}
      style={{ marginRight: 30, marginBottom: 30 }}
      onClick={() =>
        router.push({
          pathname: "/classes/[classId]",
          query: { classId: _id },
        })
      }
    >
      <div
        className={classes["classCard__upper"]}
        style={{ backgroundColor: backgroundColor }}
      >
        <div className={classes["classCard_desc"]}>
          <div className={classes["classCard__className"]}>{className}</div>
          {teacher?.credentials?.name && (
            <div className={classes["classCard__creatorName"]}>
              {teacher?.credentials?.name}
            </div>
          )}
        </div>
        {teacher?.credentials?.userImage && (
          <Image
            width={60}
            height={60}
            src={teacher?.credentials?.userImage}
            alt="user_img"
            className={classes["classCard__creatorPhoto"]}
          />
        )}
      </div>
      <div className={classes["classCard__middle"]}></div>
      <div className={classes["classCard__lower"]}></div>
    </div>
  );
};

export default ClassCard;
