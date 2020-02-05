package com.rpm.web.carbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Lazy
public class CarbookServiceImpl implements CarbookService {
    @Autowired RecordRepository recordRepository;

    @Override
    public List<Record> getRecords(long id) {
        return recordRepository.findByMycarId(id).stream()
                .sorted(Comparator.comparing(Record::getDate).reversed())
                .collect(Collectors.toList());
    }
}
