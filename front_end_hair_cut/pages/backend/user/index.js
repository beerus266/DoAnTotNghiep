import cn from "classnames";
import Badge from "components/atoms/Badge";
import Breadcrumb from "components/organisms/Breadcrumb";
import LayoutBackend from "components/organisms/Layouts/LayoutBackend";

import { axios } from "utils/axios";

const User = ({users}) => {
    console.log(users);

    const textTdClass = 'text-center py-4 px-2';

    return (
        <div className="p-10 grow bg-gray-light">
            <Breadcrumb  
                page={
                    {
                        title: 'User',
                        url: '/backend/user'
                    }
                }
            />

            <div className="w-full h-auto bg-white rounded-lg p-5 drop-shadow-xl mb-5">
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="text-xl">
                                <th className="text-left p-2">STT</th>
                                <th className="p-2">Username</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Role</th>
                                <th className="p-2">Actived</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => 
                                <tr className="border-t-2 border-t-gray-light hover:bg-gray-n300" key={user.id}>
                                    <td className="pl-2">{index + 1}</td>
                                    <td 
                                        className={cn(textTdClass)}
                                    >
                                        {user.username}
                                    </td>
                                    <td 
                                        className={cn(textTdClass)}
                                    >
                                        {user.emailAddress}
                                    </td>
                                    <td 
                                        className={cn(textTdClass)}
                                    >
                                        {user.role}
                                    </td>
                                    <td 
                                        className={cn(textTdClass)}
                                    >
                                        {user.actived ? '1' : '0'}
                                    </td>
                                    
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

User.getLayout = (page) => <LayoutBackend children={page} />

export const getServerSideProps = async (context) => {

    const users = await axios.get(`user/getAllUser`, {

    }).then((res) => {
        return res.data;
    }).catch((res) => {

    });

    if (users) {
        return {
            props: {
                users,
            }
        }
    } else {
        return {
            redirect: {
                destination: '/backend/login',
                permanent:false,
            }
        }
    }


}

export default User;
