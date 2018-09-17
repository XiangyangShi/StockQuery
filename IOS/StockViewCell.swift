//
//  StockViewCell.swift
//  hwtestSplit
//
//  Created by 史向阳 on 2017/11/28.
//  Copyright © 2017年 史向阳. All rights reserved.
//

import UIKit

class StockViewCell: UITableViewCell {

    @IBOutlet weak var label1: UILabel!
    @IBOutlet weak var label2: UILabel!
    @IBOutlet weak var img1: UIImageView!
    @IBOutlet weak var img2: UIImageView!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
    func initial(text1:String , text2:String ){
        label1.text = text1
        label2.text = text2
        img2.isHidden = true
        img1.isHidden = true
        if(text1 == "Change"){
            let greaterornot = (text2 as NSString).floatValue
            if(greaterornot>0){
                img1.isHidden = false
            }
            else{
                img2.isHidden = false
            }
        }
    }
    
}
