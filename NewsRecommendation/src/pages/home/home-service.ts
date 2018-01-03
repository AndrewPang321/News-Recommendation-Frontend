import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()

export class HomePageService {

  writeToken: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvd25lciI6IkFuZHJld1BhbmczMjEiLCJwcm9qZWN0IjoiTmV3c19SZWNvbW1lbmRlciIsInJpZ2h0Ijoid3JpdGUiLCJwbGF0Zm9ybSI6Imh0dHBzOi8vYmV0YS5jcmFmdC5haSIsImlhdCI6MTUxNDUyMDk5OCwiaXNzIjoiaHR0cHM6Ly9iZXRhLmNyYWZ0LmFpIiwianRpIjoiYTc5MWEwNGYtM2IxZC00NjM4LWFhODUtODEzNGU3YWIyMDlmIn0.lF78rXcSlPQwsDNDfcLFIjFFkMGE-T0_yDP6YA00cSQ";

  constructor(private http: Http) {
    
  }

  // Set HTTP REQUEST header for craft_ai
  setAuthHeader(): RequestOptions {
    var headers = new Headers();
    headers.append("Authorization", "Bearer " + this.writeToken);
    headers.append("Content-Type", "application/json");

    return new RequestOptions({
      headers: headers
    });
  }

  createCraftAiAgentObj() {
    var craftAiAgentItem = {
      "id": "my_first_agent",
      "configuration": {
        "context": {
          "keyword1": {
            "type": "enum"
          },
          "keyword2": {
            "type": "enum"
          },
          "keyword3": {
            "type": "enum"
          },
          "keyword4": {
            "type": "enum"
          },
          "keyword5": {
            "type": "enum"
          },
          "read": {
            "type": "enum"
          },
          "timeOfDay": {
            "type": "time_of_day"
          },
          "timezone": {
            "type": "timezone"
          }
        },
        "output": ["read"]
      }
    };
    return craftAiAgentItem;
  }

  addCraftAiAgentRequest() {
    return this.http.post(`https://beta.craft.ai/api/v1/AndrewPang321/News_Recommender/agents`
      , this.createCraftAiAgentObj(), this.setAuthHeader())
      .map(response => response.json());
  }

  submitCraftAiAgentRequest() {
    console.log(`ready to do HTTP POST, submitCraftAiAgentRequest() called`);
    return new Promise((resolve, reject) => {
      this.addCraftAiAgentRequest()
        .subscribe(
          (result: any) => {
            resolve(result);
          },
          (error: any) => {
            console.log(`Error received in calling this.submitCraftAiAgentRequest()`);
            reject(error);
          }
        )
    });
  }

  createCraftAiActionObj(keywords) {
    var craftAiActionItem = [
      {
        "timestamp": Math.floor(Date.now() / 1000),
        "context": {
          "timezone": "+08:00",
          "keyword1": keywords[0],
          "keyword2": keywords[1],
          "keyword3": keywords[2],
          "keyword4": keywords[3],
          "keyword5": keywords[4],
          "read": "interested"
        }
      }
    ];
    return craftAiActionItem;
  }

  addCraftAiActionRequest(keywords) {
    return this.http.post(`https://beta.craft.ai/api/v1/AndrewPang321/News_Recommender/agents/my_first_agent/context`
      , this.createCraftAiActionObj(keywords), this.setAuthHeader())
      .map(response => response.json());
  }

  submitCraftAiActionRequest(keywords) {
    console.log(`ready to do HTTP POST, submitCraftAiActionRequest() called`);
    return new Promise((resolve, reject) => {
      this.addCraftAiActionRequest(keywords)
        .subscribe(
          (result: any) => {
            resolve(result);
          },
          (error: any) => {
            console.log(`Error received in calling this.submitCraftAiActionRequest()`);
            reject(error);
          }
        )
    });
  }

}
