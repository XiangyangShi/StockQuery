//
//  stockinfo.swift
//  hwtestSplit
//
//  Created by 史向阳 on 2017/11/28.
//  Copyright © 2017年 史向阳. All rights reserved.
//

import UIKit

class stockinfo {
    
    //MARK: Properties
    
    var symbol: String
    var change: String
    //var changerate: String
    var close: String
    var iffavourlist: Int
    //MARK: Initialization
    
    init?(symbol: String, change: String, close: String, iffavour: Int) {
        
        // Initialization should fail if there is no name or if the rating is negative.
        if symbol.isEmpty {
            return nil
        }
        self.symbol = symbol
        self.change = change
        //self.changerate = changerate
        self.close = close
        self.iffavourlist = iffavour
    }
    
}
