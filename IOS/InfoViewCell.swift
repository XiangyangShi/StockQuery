//
//  InfoViewCell.swift
//  hwtestSplit
//
//  Created by 史向阳 on 2017/11/29.
//  Copyright © 2017年 史向阳. All rights reserved.
//

import UIKit

class InfoViewCell: UITableViewCell {

    @IBOutlet weak var label1: UILabel!
    @IBOutlet weak var label2: UILabel!
    @IBOutlet weak var label3: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    func initial( text1 : String , text2 : String , text3 : String ){
        self.label1.text = text1
        self.label2.text = text2
        self.label3.text = text3
        let checkifgreen = (text3 as NSString).floatValue
        if (checkifgreen > 0){
            self.label3.textColor = UIColor.green
        }
        else{
            self.label3.textColor = UIColor.red
        }
        
    }

}
