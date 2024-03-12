import axios from 'axios';
import * as Q from '@/types/APIConstants'
export async function POST() {

  console.log("posting score")
      const response = await axios.post(
        Q.addScore,
        {
          competitionName: "Kilpailu",
          ScoreList: [10.9]
        },
        {
          headers: {
            Authorization: `Bearer ${("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
}