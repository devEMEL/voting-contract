import algosdk from "algosdk";
import * as bkr from "beaker-ts";
export class Voting extends bkr.ApplicationClient {
    desc: string = "";
    override appSchema: bkr.Schema = { declared: { proposal: { type: bkr.AVMType.bytes, key: "proposal", desc: "", static: false }, start_time: { type: bkr.AVMType.uint64, key: "start_time", desc: "", static: false }, end_time: { type: bkr.AVMType.uint64, key: "end_time", desc: "", static: false }, result: { type: bkr.AVMType.bytes, key: "result", desc: "", static: false }, num_of_yays: { type: bkr.AVMType.uint64, key: "num_of_yays", desc: "", static: false }, num_of_nays: { type: bkr.AVMType.uint64, key: "num_of_nays", desc: "", static: false } }, reserved: {} };
    override acctSchema: bkr.Schema = { declared: { vote_choice: { type: bkr.AVMType.bytes, key: "vote_choice", desc: "", static: false }, has_vote: { type: bkr.AVMType.uint64, key: "has_vote", desc: "", static: false } }, reserved: {} };
    override approvalProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKaW50Y2Jsb2NrIDAgMQpieXRlY2Jsb2NrIDB4NmU3NTZkNWY2ZjY2NWY3OTYxNzk3MyAweDZlNzU2ZDVmNmY2NjVmNmU2MTc5NzMgMHg3NjZmNzQ2NTVmNjM2ODZmNjk2MzY1IDB4NzI2NTczNzU2Yzc0IDB4Njg2MTczNWY3NjZmNzQ2NSAweCAweDY1NmU2NDVmNzQ2OTZkNjUgMHg3Mzc0NjE3Mjc0NWY3NDY5NmQ2NSAweDc5NjU3MyAweDZlNmYgMHg3MDcyNmY3MDZmNzM2MTZjCnR4biBOdW1BcHBBcmdzCmludGNfMCAvLyAwCj09CmJueiBtYWluX2w4CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4ZGFlMzg2ZDggLy8gImNyZWF0ZV9wcm9wb3NhbChzdHJpbmcsdWludDY0KXZvaWQiCj09CmJueiBtYWluX2w3CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4OWMyYjgwZDUgLy8gInZvdGUoc3RyaW5nLHN0cmluZyxhcHBsaWNhdGlvbil2b2lkIgo9PQpibnogbWFpbl9sNgp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGViYzVkYjEyIC8vICJnZXRfdm90ZV9yZXN1bHQoKXN0cmluZyIKPT0KYm56IG1haW5fbDUKZXJyCm1haW5fbDU6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CmNhbGxzdWIgZ2V0dm90ZXJlc3VsdF84CnN0b3JlIDUKcHVzaGJ5dGVzIDB4MTUxZjdjNzUgLy8gMHgxNTFmN2M3NQpsb2FkIDUKY29uY2F0CmxvZwppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sNjoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQpzdG9yZSAyCnR4bmEgQXBwbGljYXRpb25BcmdzIDIKc3RvcmUgMwp0eG5hIEFwcGxpY2F0aW9uQXJncyAzCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgNApsb2FkIDIKbG9hZCAzCmxvYWQgNApjYWxsc3ViIHZvdGVfNwppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sNzoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQpzdG9yZSAwCnR4bmEgQXBwbGljYXRpb25BcmdzIDIKYnRvaQpzdG9yZSAxCmxvYWQgMApsb2FkIDEKY2FsbHN1YiBjcmVhdGVwcm9wb3NhbF82CmludGNfMSAvLyAxCnJldHVybgptYWluX2w4Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CmJueiBtYWluX2wxNAp0eG4gT25Db21wbGV0aW9uCmludGNfMSAvLyBPcHRJbgo9PQpibnogbWFpbl9sMTMKdHhuIE9uQ29tcGxldGlvbgpwdXNoaW50IDIgLy8gQ2xvc2VPdXQKPT0KYm56IG1haW5fbDEyCmVycgptYWluX2wxMjoKdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KYXNzZXJ0CmNhbGxzdWIgY2xlYXJ2b3RlXzUKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDEzOgp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQphc3NlcnQKY2FsbHN1YiBvcHRpbl8xCmludGNfMSAvLyAxCnJldHVybgptYWluX2wxNDoKdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKPT0KYXNzZXJ0CmNhbGxzdWIgY3JlYXRlXzAKaW50Y18xIC8vIDEKcmV0dXJuCgovLyBjcmVhdGUKY3JlYXRlXzA6CmJ5dGVjIDEwIC8vICJwcm9wb3NhbCIKYnl0ZWMgNSAvLyAiIgphcHBfZ2xvYmFsX3B1dApieXRlYyA3IC8vICJzdGFydF90aW1lIgppbnRjXzAgLy8gMAphcHBfZ2xvYmFsX3B1dApieXRlYyA2IC8vICJlbmRfdGltZSIKaW50Y18wIC8vIDAKYXBwX2dsb2JhbF9wdXQKYnl0ZWNfMyAvLyAicmVzdWx0IgpieXRlYyA1IC8vICIiCmFwcF9nbG9iYWxfcHV0CmJ5dGVjXzAgLy8gIm51bV9vZl95YXlzIgppbnRjXzAgLy8gMAphcHBfZ2xvYmFsX3B1dApieXRlY18xIC8vICJudW1fb2ZfbmF5cyIKaW50Y18wIC8vIDAKYXBwX2dsb2JhbF9wdXQKcmV0c3ViCgovLyBvcHRpbgpvcHRpbl8xOgp0eG4gU2VuZGVyCmJ5dGVjXzIgLy8gInZvdGVfY2hvaWNlIgpieXRlYyA1IC8vICIiCmFwcF9sb2NhbF9wdXQKdHhuIFNlbmRlcgpieXRlYyA0IC8vICJoYXNfdm90ZSIKaW50Y18wIC8vIDAKYXBwX2xvY2FsX3B1dApyZXRzdWIKCi8vIGF1dGhfb25seQphdXRob25seV8yOgpnbG9iYWwgQ3JlYXRvckFkZHJlc3MKPT0KcmV0c3ViCgovLyBhdXRoX29wdGVkX2luCmF1dGhvcHRlZGluXzM6Cmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25JRAphcHBfb3B0ZWRfaW4KcmV0c3ViCgovLyBhdXRoX29ubHkKYXV0aG9ubHlfNDoKZ2xvYmFsIENyZWF0b3JBZGRyZXNzCj09CnJldHN1YgoKLy8gY2xlYXJfdm90ZQpjbGVhcnZvdGVfNToKdHhuIFNlbmRlcgpieXRlYyA0IC8vICJoYXNfdm90ZSIKYXBwX2xvY2FsX2dldAppbnRjXzEgLy8gMQo9PQphc3NlcnQKdHhuIFNlbmRlcgpieXRlY18yIC8vICJ2b3RlX2Nob2ljZSIKYXBwX2xvY2FsX2dldApieXRlYyA4IC8vICJ5ZXMiCj09CmJueiBjbGVhcnZvdGVfNV9sMwp0eG4gU2VuZGVyCmJ5dGVjXzIgLy8gInZvdGVfY2hvaWNlIgphcHBfbG9jYWxfZ2V0CmJ5dGVjIDkgLy8gIm5vIgo9PQpieiBjbGVhcnZvdGVfNV9sNApieXRlY18xIC8vICJudW1fb2ZfbmF5cyIKYXBwX2dsb2JhbF9nZXQKaW50Y18wIC8vIDAKPgphc3NlcnQKYnl0ZWNfMSAvLyAibnVtX29mX25heXMiCmJ5dGVjXzEgLy8gIm51bV9vZl9uYXlzIgphcHBfZ2xvYmFsX2dldAppbnRjXzEgLy8gMQotCmFwcF9nbG9iYWxfcHV0CmIgY2xlYXJ2b3RlXzVfbDQKY2xlYXJ2b3RlXzVfbDM6CmJ5dGVjXzAgLy8gIm51bV9vZl95YXlzIgphcHBfZ2xvYmFsX2dldAppbnRjXzAgLy8gMAo+CmFzc2VydApieXRlY18wIC8vICJudW1fb2ZfeWF5cyIKYnl0ZWNfMCAvLyAibnVtX29mX3lheXMiCmFwcF9nbG9iYWxfZ2V0CmludGNfMSAvLyAxCi0KYXBwX2dsb2JhbF9wdXQKY2xlYXJ2b3RlXzVfbDQ6CnR4biBTZW5kZXIKYnl0ZWNfMiAvLyAidm90ZV9jaG9pY2UiCmJ5dGVjIDUgLy8gIiIKYXBwX2xvY2FsX3B1dAp0eG4gU2VuZGVyCmJ5dGVjIDQgLy8gImhhc192b3RlIgppbnRjXzAgLy8gMAphcHBfbG9jYWxfcHV0CnJldHN1YgoKLy8gY3JlYXRlX3Byb3Bvc2FsCmNyZWF0ZXByb3Bvc2FsXzY6CnN0b3JlIDgKc3RvcmUgNwp0eG4gU2VuZGVyCmNhbGxzdWIgYXV0aG9ubHlfMgovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0CmJ5dGVjIDEwIC8vICJwcm9wb3NhbCIKbG9hZCA3CmV4dHJhY3QgMiAwCmFwcF9nbG9iYWxfcHV0CmJ5dGVjIDcgLy8gInN0YXJ0X3RpbWUiCmdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKYXBwX2dsb2JhbF9wdXQKYnl0ZWMgNiAvLyAiZW5kX3RpbWUiCmdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKbG9hZCA4CisKYXBwX2dsb2JhbF9wdXQKcmV0c3ViCgovLyB2b3RlCnZvdGVfNzoKc3RvcmUgMTEKc3RvcmUgMTAKc3RvcmUgOQp0eG4gU2VuZGVyCmNhbGxzdWIgYXV0aG9wdGVkaW5fMwovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0CnR4biBTZW5kZXIKbG9hZCAxMQp0eG5hcyBBcHBsaWNhdGlvbnMKbG9hZCAxMApleHRyYWN0IDIgMAphcHBfbG9jYWxfZ2V0X2V4CnN0b3JlIDEzCnN0b3JlIDEyCmxvYWQgMTMKYXNzZXJ0Cmdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKYnl0ZWMgNyAvLyAic3RhcnRfdGltZSIKYXBwX2dsb2JhbF9nZXQKPj0KZ2xvYmFsIExhdGVzdFRpbWVzdGFtcApieXRlYyA2IC8vICJlbmRfdGltZSIKYXBwX2dsb2JhbF9nZXQKPD0KJiYKYXNzZXJ0CmxvYWQgMTIKaW50Y18xIC8vIDEKPT0KYXNzZXJ0CnR4biBTZW5kZXIKYnl0ZWMgNCAvLyAiaGFzX3ZvdGUiCmFwcF9sb2NhbF9nZXQKaW50Y18wIC8vIDAKPT0KYXNzZXJ0CmxvYWQgOQpleHRyYWN0IDIgMApieXRlYyA4IC8vICJ5ZXMiCj09CmJueiB2b3RlXzdfbDMKbG9hZCA5CmV4dHJhY3QgMiAwCmJ5dGVjIDkgLy8gIm5vIgo9PQpieiB2b3RlXzdfbDQKdHhuIFNlbmRlcgpieXRlY18yIC8vICJ2b3RlX2Nob2ljZSIKYnl0ZWMgOSAvLyAibm8iCmFwcF9sb2NhbF9wdXQKYnl0ZWNfMSAvLyAibnVtX29mX25heXMiCmJ5dGVjXzEgLy8gIm51bV9vZl9uYXlzIgphcHBfZ2xvYmFsX2dldAppbnRjXzEgLy8gMQorCmFwcF9nbG9iYWxfcHV0CmIgdm90ZV83X2w0CnZvdGVfN19sMzoKdHhuIFNlbmRlcgpieXRlY18yIC8vICJ2b3RlX2Nob2ljZSIKYnl0ZWMgOCAvLyAieWVzIgphcHBfbG9jYWxfcHV0CmJ5dGVjXzAgLy8gIm51bV9vZl95YXlzIgpieXRlY18wIC8vICJudW1fb2ZfeWF5cyIKYXBwX2dsb2JhbF9nZXQKaW50Y18xIC8vIDEKKwphcHBfZ2xvYmFsX3B1dAp2b3RlXzdfbDQ6CnR4biBTZW5kZXIKYnl0ZWMgNCAvLyAiaGFzX3ZvdGUiCmludGNfMSAvLyAxCmFwcF9sb2NhbF9wdXQKcmV0c3ViCgovLyBnZXRfdm90ZV9yZXN1bHQKZ2V0dm90ZXJlc3VsdF84Ogp0eG4gU2VuZGVyCmNhbGxzdWIgYXV0aG9ubHlfNAovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0Cmdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKYnl0ZWMgNiAvLyAiZW5kX3RpbWUiCmFwcF9nbG9iYWxfZ2V0Cj4KYXNzZXJ0CmJ5dGVjXzAgLy8gIm51bV9vZl95YXlzIgphcHBfZ2xvYmFsX2dldApieXRlY18xIC8vICJudW1fb2ZfbmF5cyIKYXBwX2dsb2JhbF9nZXQKPgpibnogZ2V0dm90ZXJlc3VsdF84X2w0CmJ5dGVjXzAgLy8gIm51bV9vZl95YXlzIgphcHBfZ2xvYmFsX2dldApieXRlY18xIC8vICJudW1fb2ZfbmF5cyIKYXBwX2dsb2JhbF9nZXQKPApibnogZ2V0dm90ZXJlc3VsdF84X2wzCmJ5dGVjXzMgLy8gInJlc3VsdCIKcHVzaGJ5dGVzIDB4NzU2ZTY0NjU2MzY5NjQ2NTY0IC8vICJ1bmRlY2lkZWQiCmFwcF9nbG9iYWxfcHV0CmIgZ2V0dm90ZXJlc3VsdF84X2w1CmdldHZvdGVyZXN1bHRfOF9sMzoKYnl0ZWNfMyAvLyAicmVzdWx0IgpwdXNoYnl0ZXMgMHg3MjY1NmE2NTYzNzQ2NTY0IC8vICJyZWplY3RlZCIKYXBwX2dsb2JhbF9wdXQKYiBnZXR2b3RlcmVzdWx0XzhfbDUKZ2V0dm90ZXJlc3VsdF84X2w0OgpieXRlY18zIC8vICJyZXN1bHQiCnB1c2hieXRlcyAweDcwNjE3MzczNjU2NCAvLyAicGFzc2VkIgphcHBfZ2xvYmFsX3B1dApnZXR2b3RlcmVzdWx0XzhfbDU6CmJ5dGVjXzMgLy8gInJlc3VsdCIKYXBwX2dsb2JhbF9nZXQKc3RvcmUgNgpsb2FkIDYKbGVuCml0b2IKZXh0cmFjdCA2IDAKbG9hZCA2CmNvbmNhdApzdG9yZSA2CmxvYWQgNgpyZXRzdWI=";
    override clearProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKaW50Y2Jsb2NrIDAgMQpieXRlY2Jsb2NrIDB4NzY2Zjc0NjU1ZjYzNjg2ZjY5NjM2NSAweDZlNzU2ZDVmNmY2NjVmNmU2MTc5NzMgMHg2ZTc1NmQ1ZjZmNjY1Zjc5NjE3OTczIDB4Njg2MTczNWY3NjZmNzQ2NQp0eG4gTnVtQXBwQXJncwppbnRjXzAgLy8gMAo9PQpibnogbWFpbl9sMgplcnIKbWFpbl9sMjoKY2FsbHN1YiBjbGVhcnZvdGVfMAppbnRjXzEgLy8gMQpyZXR1cm4KCi8vIGNsZWFyX3ZvdGUKY2xlYXJ2b3RlXzA6CnR4biBTZW5kZXIKYnl0ZWNfMyAvLyAiaGFzX3ZvdGUiCmFwcF9sb2NhbF9nZXQKaW50Y18xIC8vIDEKPT0KYXNzZXJ0CnR4biBTZW5kZXIKYnl0ZWNfMCAvLyAidm90ZV9jaG9pY2UiCmFwcF9sb2NhbF9nZXQKcHVzaGJ5dGVzIDB4Nzk2NTczIC8vICJ5ZXMiCj09CmJueiBjbGVhcnZvdGVfMF9sMwp0eG4gU2VuZGVyCmJ5dGVjXzAgLy8gInZvdGVfY2hvaWNlIgphcHBfbG9jYWxfZ2V0CnB1c2hieXRlcyAweDZlNmYgLy8gIm5vIgo9PQpieiBjbGVhcnZvdGVfMF9sNApieXRlY18xIC8vICJudW1fb2ZfbmF5cyIKYXBwX2dsb2JhbF9nZXQKaW50Y18wIC8vIDAKPgphc3NlcnQKYnl0ZWNfMSAvLyAibnVtX29mX25heXMiCmJ5dGVjXzEgLy8gIm51bV9vZl9uYXlzIgphcHBfZ2xvYmFsX2dldAppbnRjXzEgLy8gMQotCmFwcF9nbG9iYWxfcHV0CmIgY2xlYXJ2b3RlXzBfbDQKY2xlYXJ2b3RlXzBfbDM6CmJ5dGVjXzIgLy8gIm51bV9vZl95YXlzIgphcHBfZ2xvYmFsX2dldAppbnRjXzAgLy8gMAo+CmFzc2VydApieXRlY18yIC8vICJudW1fb2ZfeWF5cyIKYnl0ZWNfMiAvLyAibnVtX29mX3lheXMiCmFwcF9nbG9iYWxfZ2V0CmludGNfMSAvLyAxCi0KYXBwX2dsb2JhbF9wdXQKY2xlYXJ2b3RlXzBfbDQ6CnR4biBTZW5kZXIKYnl0ZWNfMCAvLyAidm90ZV9jaG9pY2UiCnB1c2hieXRlcyAweCAvLyAiIgphcHBfbG9jYWxfcHV0CnR4biBTZW5kZXIKYnl0ZWNfMyAvLyAiaGFzX3ZvdGUiCmludGNfMCAvLyAwCmFwcF9sb2NhbF9wdXQKcmV0c3Vi";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({ name: "create_proposal", desc: "", args: [{ type: "string", name: "proposal", desc: "" }, { type: "uint64", name: "end_time", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "vote", desc: "", args: [{ type: "string", name: "vote_choice", desc: "" }, { type: "string", name: "key", desc: "" }, { type: "application", name: "app", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_vote_result", desc: "", args: [], returns: { type: "string", desc: "" } })
    ];
    async create_proposal(args: {
        proposal: string;
        end_time: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.create_proposal({ proposal: args.proposal, end_time: args.end_time }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async vote(args: {
        vote_choice: string;
        key: string;
        app: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.vote({ vote_choice: args.vote_choice, key: args.key, app: args.app }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async get_vote_result(txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<string>> {
        const result = await this.execute(await this.compose.get_vote_result(txnParams));
        return new bkr.ABIResult<string>(result, result.returnValue as string);
    }
    compose = {
        create_proposal: async (args: {
            proposal: string;
            end_time: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "create_proposal"), { proposal: args.proposal, end_time: args.end_time }, txnParams, atc);
        },
        vote: async (args: {
            vote_choice: string;
            key: string;
            app: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "vote"), { vote_choice: args.vote_choice, key: args.key, app: args.app }, txnParams, atc);
        },
        get_vote_result: async (txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "get_vote_result"), {}, txnParams, atc);
        }
    };
}
