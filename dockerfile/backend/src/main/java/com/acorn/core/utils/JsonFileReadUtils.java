package com.acorn.core.utils;

import com.google.gson.Gson;
import com.acorn.core.customException.BizException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.*;

@RequiredArgsConstructor
@Component
public class JsonFileReadUtils {

    private static String mockDir ;

    @Value("${mockdir:/work}")
    public void setMockDir(String mockDir) {
        this.mockDir = mockDir;
    }

    @SuppressWarnings("unchecked")
    public static <T> T jsonLoading(String filename , Class<?> className) throws FileNotFoundException, UnsupportedEncodingException {
        String filepath = mockDir + "\\" + filename + ".json";
        Reader reader = new FileReader(filepath);

        //        BufferedReader reader01 = new BufferedReader(new InputStreamReader(new FileInputStream(filepath),"UTF-8"));

        return (T) new Gson().fromJson(reader, className);

    }

    public static Reader fileLoad(String dirtory, String filename) {
        // Reader reader = null;
        BufferedReader reader = null;
        String filepath = dirtory + filename + ".json";
        try {
            // ,"UTF-8"
            reader = new BufferedReader(new InputStreamReader(new FileInputStream(filepath),"UTF-8"));
            //reader = new BufferedReader(new InputStreamReader(new FileInputStream(filepath) ));
            // reader = new FileReader( this.tourlistDir + filename + ".json");
        } catch (FileNotFoundException | UnsupportedEncodingException e) {
            throw new BizException(filepath + " 파일이 없습니다.e");
        }
        return reader;
    }
}