import React from 'react';
import { View, Text } from 'react-native';
import styles from "./MessageCard.style"

import {formatDistance, parseISO} from "date-fns"
import { tr } from 'date-fns/locale'



const MessageCard = ({message, user}) => {

  const [isAuthor, setIsAuthor] = React.useState(false)

  React.useEffect(() => {
    setIsAuthor(user === message.author);
  }, []);
  
  const formattedDate = formatDistance(parseISO(message.date), new Date(), { addSuffix: true, locale: tr });

    return (
      <View style={[styles.container, isAuthor ?  { alignSelf: "flex-end"}: null]} >
        <Text style={styles.author} >{message.author}</Text>
        <Text style={styles.message} > {message.text} </Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
    );
}

export default MessageCard;
