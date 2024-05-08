import type { FC } from "react";
import { Space, Badge, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const UserInfo: FC = () => {
  return (
    <Space>
      <a href="#">
        <Badge size="small" count={9}>
          <Avatar icon={<UserOutlined />} />
        </Badge>
      </a>
    </Space>
  );
};

export default UserInfo;
