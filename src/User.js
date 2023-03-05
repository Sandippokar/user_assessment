import React, { useState } from "react";
import style from "./User.module.css";
import { Card, Modal, Form, Input } from "antd";
import {
  HeartFilled,
  HeartOutlined,
  EditOutlined,
  DeleteFilled,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const User = ({ user, updateUserData, deleteUser }) => {
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        updateUserData(user.id, values);
        handleCancel();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <>
      <Modal
        title="User Information Modal"
        open={showModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          {...layout}
          name="form_in_modal"
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
          initialValues={user}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: "email", required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="website"
            label="Website"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Card
        cover={
          <div className={style.imageDiv}>
            <img
              src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
              alt="User Avatar"
              className={style.image}
            />
          </div>
        }
        style={{ margin: 15 }}
        actions={[
          liked ? (
            <button className={style.likeBtn} onClick={handleLike}>
                <HeartFilled className={style.likeIcon} />
            </button>
          ) : (
            <button className={style.likeBtn} onClick={handleLike}>
                <HeartOutlined className={style.likeIcon} />
            </button>
          ),

          <EditOutlined className={style.icon} onClick={openModal} />,

          <DeleteFilled className={style.icon} onClick={() => {deleteUser(user.id)}} />,
        ]}
      >
        <h3 className={style.userName}>{user.name}</h3>
        <div className={style.userInfo}>
          <MailOutlined className={style.icon} />
          <p className={style.detail}>{user.email}</p>
        </div>
        <div className={style.userInfo}>
          <PhoneOutlined className={style.icon} />
          <p className={style.detail}>{user.phone}</p>
        </div>
        <div className={style.userInfo}>
          <GlobalOutlined className={style.icon} />
          <p className={style.detail} style={{ cursor: "pointer" }}>
            http://{user.website}
          </p>
        </div>
      </Card>
    </>
  );
};

export default User;
