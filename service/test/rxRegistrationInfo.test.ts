import { beforeAll,describe, test, expect } from "@jest/globals";
import request from "supertest";

const BASE_URL = "http://localhost:8080/";

let token = "";
// eslint-disable-next-line no-undef
beforeAll (async () => {
  const response = await request(BASE_URL)
    .post("login")
    .send({ emailOrPhone: "pritam@rxefy.com", password: "Pritam@rxefy123" })
    .set("Content-Type", "application/json")
    .set("Accept-Encoding", "gzip, deflate, br")
    .set("Connection", "keep-alive")
    .set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36");
  token = response.body.accessToken;
});
describe("Test: rx/registrationInfo",() => {
  test("TC01 Verify API Response Status Code", async () => {
    const response = await request(BASE_URL)
    
      .get("rx/registrationInfo")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .set("Accept-Encoding", "gzip, deflate, br")
      .set("Connection", "keep-alive")
      .set("User-Agent", "(Windows 11; Win64; x64) Version 123.0.6312.106 (Official Build) (64-bit)");

    expect(response.statusCode).toBe(204);  //As there is no content available aganist this login ID
    //expect(response.statusCode).toBe(200);
  });
});

