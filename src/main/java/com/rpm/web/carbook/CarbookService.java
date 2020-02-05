package com.rpm.web.carbook;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Lazy
public interface CarbookService {

    public List<Record> getRecords(long id);
}
