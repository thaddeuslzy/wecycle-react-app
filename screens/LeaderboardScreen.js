import * as React from 'react';
import { View } from 'react-native';
import Leaderboard from 'react-native-leaderboard';
import LeaderHoardHeader from '../components/LeaderBoardHeader';
import LeaderBoardHeader from '../components/LeaderBoardHeader';

export default function() {
    const data = [
        {userName: "Thaddeus", score: 69, iconUrl: 'https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094043-stock-illustration-profile-icon-male-avatar.jpg' },
        {userName: "Gavin", score: 96, iconUrl: 'https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png' },
        {userName: "Beatrice", score: 696, iconUrl: 'https://landofblogging.files.wordpress.com/2014/01/bitstripavatarprofilepic.jpeg?w=300&h=300' },
        {userName: "Sanjukta", score: 969, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr27ZFBaclzKcxg2FgJh6xi3Z5-9vP_U1DPcB149bYXxlPKqv-' },
        { userName: 'Jimmy John', score: 20, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
        { userName: 'Ericka Johannesburg', score: 101, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz' },
        { userName: 'Tina Turner', score: 22, iconUrl: 'https://cdn.dribbble.com/users/223408/screenshots/2134810/me-dribbble-size-001-001_1x.png' },
        { userName: 'Harry Reynolds', score: null, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsSlzi6GEickw2Ft62IdJTfXWsDFrOIbwXhzddXXt4FvsbNGhp' },
        { userName: 'Betty Davis', score: 25, iconUrl: 'http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png' },
        { userName: 'Lauren Leonard', score: 30, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr27ZFBaclzKcxg2FgJh6xi3Z5-9vP_U1DPcB149bYXxlPKqv-' },
    ]
    const props = {
        labelBy: "name",
        sortBy: "score",
        data: data,
        icon: "iconUrl",
        labelBy: 'userName',
    }
    return (
        <View>
            <LeaderBoardHeader/>
            <Leaderboard
                {...props}
            />
        </View>

    )
}