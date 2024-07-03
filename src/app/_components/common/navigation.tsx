import {
  UserOutlined,
  LogoutOutlined,
  StrikethroughOutlined,
} from "@ant-design/icons";
import { Button, Flex, Avatar, Dropdown } from "antd";
import Link from "next/link";
import { auth } from "../../../../auth";
import NavLinks from "./navLinks";

const Navigation: React.FC = async () => {
  const session = await auth();

  const user = session?.user;

  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "white",
          padding: "10px 20px",
          boxShadow: "0 8px 24px -2px rgba(0, 0, 0, .05)",
        }}
      >
        <Button icon={<StrikethroughOutlined />}>
          <Link
            href="/"
            className="logo"
            style={{ color: "black", fontSize: 18, fontWeight: "bold" }}
          >
            SEA Saloon
          </Link>
        </Button>

        <Flex align="center" gap={8}>
          <NavLinks />
          {user ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    label: user.full_name,
                  },
                  {
                    key: "2",
                    label: (
                      <Link href="/api/auth/signout">
                        <Button block icon={<LogoutOutlined />}>
                          Sign Out
                        </Button>
                      </Link>
                    ),
                  },
                ],
              }}
            >
              <Avatar icon={<UserOutlined />} />
            </Dropdown>
          ) : (
            <Button type="primary">
              <Link href="/signin">Sign In</Link>
            </Button>
          )}
        </Flex>
      </header>
    </>
  );
};

export default Navigation;
